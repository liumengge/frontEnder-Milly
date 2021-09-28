var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const multer = require('multer')
const fs = require('fs')

// 文件上传接口
router.post('/upload', multer({
  dest: 'upload'
}).single('file'), (req, res) => {
  if (req.file.length === 0) {
    res.render("error", {message: "上传文件不能为空！"})
    return
  } else {
    let file = req.file
    //存储上传对象信息
    let fileInfo = {}
    //修改名字，第一个参数为旧路径，第二个参数为新路径（注意：旧路径要和上面的dest保持一致）
    fs.renameSync('./public/upload_tmp/' + file.filename, './public/images/' + file.originalname)
    // 获取文件信息
    fileInfo.mimetype = file.mimetype
    fileInfo.originalname = file.originalname
    fileInfo.size = file.size
    fileInfo.path = file.path
  //设置响应类型、编码
    res.set({
      'content-type': 'application/json; charset=utf-8'
    })
    res.end("成功")
  }
})

// 多文件上传
router.post('/upload-more', multer({
  dest: 'upload'
}).array('file', 10), (req, res) => {
  const files = req.files
  const fileList = []
  for (const i in files) {
    const file = files[i]
    fs.renameSync(file.path, `upload/${file.originalname}`)
    file.path = `upload/${file.originalname}`
    fileList.push(file)
  }
  res.send(fileList)
})

// 文件下载
router.get('/download', (req, res) => {
  const url = res.query.url
  res.send(url)
})

module.exports = router
