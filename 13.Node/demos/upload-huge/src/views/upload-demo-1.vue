<template>
  <div class="about">
   <input type="file" id="btnFile" />
    <button type="button" onClick="upload(0)">上传</button>
  </div>
</template>

<script>
export default {
  setup() {

    // 文件分片上传
    function upload(index) {  // index表示第几个切片
      const btnFile = document.querySelector('#btnFile')
      const chunkSize = 1024 * 1024  // 每个切片是1M
      console.log(btnFile.files[0], 'btnFile')
      const file = btnFile.files[0]
      const [fname, fext] = file.name.split('.')
      console.log(fname, fext)

      const start = index * chunkSize
      if (start > file.size ) {

        // 合并
        function merge(name) {
          axios.post('/merge', {name:name}).then(res => {
            console.log(res)
          })
        }
        merge(file.name)
        return
      }
      // 获取一个文件分片
      const blob = file.slice(start, start + chunkSize)
      // index 为文件分片编号
      const blobName = `${fname}.${index}.${fext}`
      // 
      const blobFile = new File([blob], blobName)

      const formData = new FormData()
      formData.append('file', blobFile)
      console.log(blobFile)

      // 请求
      axios.post('/upload', formData).then(res => {
        console.log(res)
        upload(++index)
      })
    }

    return {
      upload
    }
  }
}
</script>
