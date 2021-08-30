const express = require('express')
const multiparty = require('multiparty')
const bodyParser = require('body-parser')
const fse = require('fs-extra')
const path = require('path')

const app = express()  // 创建express实例

app.use(express.static(__dirname + '/public')) // 设置静态文件目录
app.use(bodyParser.urlencoded({extended: true}))  // 解析中间件
app.use(bodyParser.json())

const UPLOAD_DIR = path.resolve(__dirname, 'public/upload')

// 定义上传路由
app.post('/upload', function (req, res) {
  const form = multiparty.Form({uploadDir: 'temp'})   // 处理上传文件，参数是存储目录
  form.parse(req)
  form.on('file', (name, chunk) => {
    // 存放切片的目录
    let chunkDir = `${UPLOAD_DIR}/${chunk.originalFilename.split('.')[0]}`

    if (!fse.existsSync(chunkDir)) {
      fse.mkdir(chunkDir)
    }

    // 原文件名.index.ext
    var dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1])
    await fse.move(chunk.path, dPath, {overwrite: true })
    re.send('文件上传成功')
  })

})

// 合并切片
app.post('/merge', function (req, res) {
  let name = req.body.name
  let fname = name.split('.')[0]

  // 获取文件名的所有分片
  let chunkDir = path.join(UPLOAD_DIR, fname)
  let chunks = await fse.readdir(chunkDir)

  
})

app.listen(3000)  // 监听3000端口
console.log('listen 3000')