<template>
  <div id="app">
    <!-- 
      action: 文件上传到服务器的接口地址
     -->
    <el-upload
      class="upload-demo"
      drag
      action="/single-file"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {

    }
  },
  methods: {
    handleSuccess() {

    },
    handleBeforeUpload(e) {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
