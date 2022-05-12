function showPreview(source) {
  const file = source.files[0]
  // 只能上传图片
  if (!/image\/\w+/.test(file.type)) {
    alert('请确保文件为image类型！')
    return false
  }
  if (window.FileReader) {
    const fr = new FileReader()
    // 文件读取成功完成时触发
    fr.onloadend = function (e) {
      // 文件一旦开始读取，无论成功或失败，实例的 result 属性都会被填充
      // 如果读取失败，则 result 的值为 null ，否则即是读取的结果，绝大多数的程序都会在成功读取文件的时候，抓取这个值。
      // 读取后的文件放在result
      document.getElementById('portrait').src = e.target.result
    }
    // 文件读取为 DataUrl
    fr.readAsDataURL(file)
  } else {
    console.log("Not supported by your browser!")
  }
}

var h = {
  init: function () {
    const that = this

    document.getElementById('File').onchange = that.fileHandler
    document.getElementById('Abort').onclick = that.abortHandler

    that.status = document.getElementById('Status')
    that.progress = document.getElementById('Progress')
    that.percent = document.getElementById('Percent')
      
    that.loaded = 0
    //每次读取1M
    that.step = 1024 * 1024
    that.times = 0

  },
  fileHandler: function (e) {
    const that = h
    const file = that.file = this.files[0]
    const reader = that.reader = new FileReader()

    that.total = file.size

    reader.onloadstart = that.onLoadstart
    reader.onprogress = that.onProgress
    reader.onabort = that.onAbort
    reader.onerror = that.onError
    reader.onload = that.onLoad
    reader.onloadend = that.onLoadEnd
    //读取第一块
    that.readBlob(file, 0)
  },
  onLoadstart: function () {
    const that = h
  },
  onProgress: function (e) {
    const that = h
    that.loaded += e.loaded

    // 进度更新
    that.onProgress.value = (that.loaded / that.total) * 100
  },
  onAbort: function() {
    var that = h
  },
  onError: function() {
    var that = h
  },
  onLoad: function() {
    var that = h

    if(that.loaded < that.total) {
      that.readBlob(that.loaded)
    } else {
      that.loaded = that.total
    }
  },
  onLoadEnd: function() {
    var that = h
  },
  readBlob: function (start) {
    const that = h

    let blob,
      file = that.file
    that.times += 1

    if (file.webkitSlice) {
      blob = file.webkitSlice(start, start + that.step + 1)
    } else if (file.mozSlice) {
      blob = file.mozSlice(start, start + that.step + 1)
    }

    debugger
    that.reader.readAsText(blob)
  },
  abortHandler: function () {
    const that = h

    if (that.reader) {
      that.reader.abort()
    }
  }
}

h.init()