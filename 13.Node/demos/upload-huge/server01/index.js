const express = require('express')
const multiparty = require('multiparty')
const bodyParser = require('body-parser')
const fse = require('fs-extra')
const path = require('path')
const fs = require('fs')

const app = express()  // 创建express实例

app.use(express.static(__dirname + '/public')) // 设置静态文件目录
app.use(bodyParser.urlencoded({extended: true}))  // 解析中间件
app.use(bodyParser.json())

const UPLOAD_DIR = path.resolve(__dirname, 'public/upload')

// 定义上传路由
app.post('/upload', function (req, res) {
  const form = new multiparty.Form({uploadDir: 'temp'})   // 处理上传文件，参数是存储目录
  form.parse(req)
  form.on('file', async (name, chunk) => {
    // 存放切片的目录
    const chunkDir = `${UPLOAD_DIR}/${chunk.originalFilename.split('.')[0]}`
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }

    // 原文件名.index.ext
    const dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1])
    await fse.move(chunk.path, dPath, {overwrite: true })
    res.send('文件上传成功')
  })
})

// 合并切片
app.post('/merge', async function (req, res) {
  const name = req.body.name
  const fname = name.split('.')[0]

  // 获取文件名的所有分片
  const chunkDir = path.join(UPLOAD_DIR, fname)
  const chunks = await fse.readdir(chunkDir)

  // 合并文件
  chunks.sort((a, b) => a-b).map(chunkPath => {
    fs.appendFileSync(
      path.join(UPLOAD_DIR, name),
      fs.readFileSync(`${chunkDir}/${chunkPath}`)
    ) 
  })

  // 删除切片目录
  fse.removeSync(chunkDir)

  // 返回合并成功后的url地址
  res.send({
    msg: '合并成功',
    url: `http://localhost:3000/upload/${name}`
  })
  
})

app.listen(5502)  // 监听3000端口
console.log('listen 5502')