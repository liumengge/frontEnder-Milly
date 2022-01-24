const http = require('http')
const Koa = require('koa2')
const KoaStatic = require('koa-static')
const KoaBody = require('koa-body')
const fs = require('fs')
const path = require('path')

const app = new Koa()

const port = process.env.PORT || '8000'

const uploadHost= `http://localhost:${port}/uploads/`

app.use(KoaBody({
  formidable: {
    // 设置文件的默认保存目录，不设置则保存在系统临时目录下  os
    uploadDir: path.resolve(__dirname, '../static/uploads')
  },
  multipart: true // 开启文件上传，默认是关闭
}))

// 开启静态文件访问
app.use(KoaStatic(
  path.resolve(__dirname, '../static') 
))

// 文件二次处理，修改名称
app.use((ctx) => {
  const file = ctx.request.files.upload_file  // 文件对象
  const path = file.path
  const fname = file.name      // 原文件名称
  const nextPath = path + fname
  if(file.size > 0 && path){
    // 扩展名
    const extArr = fname.split('.')
    const ext = extArr[extArr.length-1]
    const nextPath = path+'.'+ext
    // 重命名文件
    fs.renameSync(path, nextPath)
  }
  //以 json 形式输出上传文件地址
  ctx.body = `{
    "fileUrl":"${uploadHost}${nextPath.slice(nextPath.lastIndexOf('/')+1)}"
  }`
})


var server = http.createServer(app.callback())
server.listen(port)
console.log('demo1 server start ......   ')