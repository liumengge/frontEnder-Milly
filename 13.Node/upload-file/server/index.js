const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const fs = require('fs')
const path = require('path')
const Multiparty = require('multiparty')

const app = new Koa()
const router = new KoaRouter()

const host = '127.0.0.1'
const port = '3000'
const HOSTNAME = host + ':' + port
const SERVER_PATH = `${__dirname}/upload`

// 中间件
app.use(async (ctx, next) => {
  // 设置允许跨域
  ctx.set('Access-Control-Allow-Origin', '*')
  next()
})

// 用于检测文件是否存在
const isFileExisted = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, err => {
      if (err) {
        reject(false)
        return
      }
      resolve(true)
    })
  })
}

// multiparty 模块解析form-data格式的文件解析和提取
const multipartyUpload = (req, autoUpload) => {
  const config = {
    maxFieldsSize: 200*1024*1024
  }
  // 上传地址
  if(autoUpload) config.uploadDir = __dirname + '/upload'
  return new Promise((resolve, reject) => {
    new Multiparty.Form(config).parse(req, (err, fields, files) => {
      console.log(fields)  // 表单相关数据
      if (err) {
        reject(err)
        return
      }
      resolve({
        fields,
        files
      })
    })
  })
}

// form-data格式的数据将以流的形式写入服务器
const writeFile = function writeFile(serverPath, file, isStream){
	return new Promise((resolve, reject)=>{
		if(isStream){
			try {
        // 以流的方式读写文件
        const readStream = fs.createReadStream(file.path)
        const writeStream = fs.createWriteStream(serverPath)
        // 将两个数据流连接
        readStream.pipe(writeStream)
        // 文件读取完成时触发
				readStream.on('end',()=>{
					resolve({
						result: true,
						message: '上传成功'
          })
          // 同步删除文件 ？？？
					fs.unlinkSync(file.path)
				})
			}catch(err){
				reject({
					result: false,
					message: err
				})
			}
		} else {
      // 不是以流的方式写入
			fs.writeFile(serverPath,file, err=>{
				if(err){
					resolve({
						result: false,
						message: err
					})
					return
				}
				resolve({
					result: true,
					message: '上传成功'
				})
			})
		}
	})
}

// 解析post请求参数，
// content-type 为 application/x-www-form-urlencoded 或 application/josn
const parsePostParams = function parsePostParams(req){
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm()
		form.parse(req,(err,fields) => {
			if(err){
				reject(err)
				return
			}
			resolve(fields)
		})
	})
}

//定义延迟函数
const delay = function delay(interval) {
  typeof interval !== 'number' ? interval = 1000 : null
  return new Promise((resolve, reject) => {
      setTimeout(function () {
          resolve()
      }, interval)
  })
}


// 大文件分片上传 - 合并
const mergeFiles = function mergeFiles(hash, count) {
	return new Promise(async (resolve, reject) => {
		const dirPath = `${SERVER_PATH}/${hash}`
		if(!fs.existsSync(dirPath)){
			reject('请先上传文件')
			return
    }
    
		const filelist = fs.readdirSync(dirPath)
		if(filelist.length < count){
			reject('文件还未上传完成，请稍后再试')
			return
    }
    
    let suffix
    
		filelist.sort((a,b)=>{
			const reg = /_(\d+)/
			return reg.exec(a)[1] - reg.exec(b)[1]
		}).forEach(item => {
		 !suffix ? suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1]: null
		 // 将每个文件读取出来并append到以hash命名的新文件中
		 fs.appendFileSync(`${SERVER_PATH}/${hash}.${suffix}`, fs.readFileSync(`${dirPath}/${item}`))
		 fs.unlinkSync(`${dirPath}/${item}`)    // 删除切片文件
		})
		
    await delay(1000) // 等待1秒后删除新产生的文件夹
    
    fs.rmdirSync(dirPath)
    
		resolve({
			path:`${HOSTNAME}/upload/${hash}.${suffix}`,
			filename: `${hash}.${suffix}`
		})
	})
}

app.use(KoaStatic('./'))
app.use(router.routes())
app.use(router.allowedMethods)

// 文件上传API, 直接上传
router.post('/upload-signal-file', async (ctx) => {
  const { files } = multipartyUpload(ctx.req, true)
  console.log(files)
  const file = (files && files.file && files.file.length) ? files.file : {}
  ctx.body = {
    code: 200,
    message: '文件上传成功',
    originalName: file.originalName
  }
})

// 上传form-data文件，文件重命名后再上传
router.post('/upload-file-form-data', async (ctx) => {
  const {
    files,
    fields
  } = await multipartyUpload(ctx.req, false)
  const file = (files && files.file.length) ? files.file[0] : {}
  const filename = (fields && fields.filename.length) ? fields.filename[0] : ''
  const filePath = `${SERVER_PATH}/${filename}`
  const isExisted = await isFileExisted(filePath)
  if (isExisted) {
    ctx.body = {
      code: 0,
      message: '文件已经存在',
      originalFilename: filename,
      serverPath: file.path.replace(__dirname, HOSTNAME)
    }
    return
  }
  // 文件不存在，需要写入服务器
  const obj = await writeFile(filePath, file, true);
  if (obj.result) {
    ctx.body = {
      code: 200,
      message: '文件上传成功',
      originalFilename: filename,
      serverPath: file.path.replace(__dirname, HOSTNAME)
    }
  } else {
    ctx.body = {
      code: 400,
      message: '文件上传失败'
    }
  }
})

// 大文件切片上传
router.post('/upload-file-chunk', async (ctx, next) => {
  try {
    const {
      files,
      fields
    } = await multipartyUpload(ctx.req, false)
    const file = (files && files.file[0]) || {}
    const filename = (fields && fields.filename[0]) || ''
    const [, hash] = /^([^_]+)_(\d+)/.exec(filename)
    const dirPath = `${SERVER_PATH}/${hash}`
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
    const filePath = `${dirPath}/${filename}`
    const isExisted = await isFileExisted(filePath)
    if (isExisted) {
      ctx.body = {
        code: 0,
        message: '文件已经存在',
        originalFilename: filename,
        serverPath: filePath.replace(__dirname, HOSTNAME)
      }
      return
    }

    await wirteFile(filePath, file, true);
    ctx.body = {
      code: 200,
      message: '文件上传成功',
      serverPath: filePath.replace(__dirname, HOSTNAME)
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      message: err
    }
  }
})

//合并切片文件
router.post('/merge-file-chunks', async (ctx) => {
  const { hash, count } = await parsePostParams(ctx.req)
  const { path, filename } = await mergeFiles(hash, count)
  ctx.body = {
    code: 0,
    message: '文件上传成功',
    path,
    filename
  }
})

//获取已上传的切片
router.get('/get-uploaded-chunks', async (ctx, next) => {
  try {
    const {
      hash
    } = ctx.request.query;
    const dirPath = `${SERVER_PATH}/${hash}`
    const filelist = fs.readdirSync(dirPath)
    filelist.sort((a, b) => {
      const reg = /_([\d+])/
      return reg.exec(a)[1] - reg.exec(b)[1]
    })
    ctx.body = {
      code: 0,
      message: '获取成功',
      filelist
    }
  } catch (err) {
    ctx.body = {
      code: 400,
      message: '获取失败'
    }
  }
})

// 
app.listen(8080, function() {
  console.log('8080 port is listing...')
})