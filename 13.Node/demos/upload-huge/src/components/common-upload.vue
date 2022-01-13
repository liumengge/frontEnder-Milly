<template>
  <el-input v-model="fileName" @update="onInput">
    <template #prepend>
      <el-button icon="el-icon-upload" type="primary" style="font-size: 18px" @click="onClick"></el-button>
      <input type="file" ref="file" style="position: fixed; left: -1px; right: -1px; width: 1px; height: 1px;" @change="onChange">
    </template>
  </el-input>
</template>

<script>
export default {
  props: {
    url: String,       // 文件上传地址
    extends: String,   // 文件类型(文件拓展名)
    fileName: String,   // 上传文件名称

  },
  setup() {
    const file = ref('')

    function upload(url, data) {
      return process(fetch(url, {
        method: 'POST',
        body: data
      }), url)
    }


    return {
      onInput() {

      },
      onClick() {

      },
      onChange() {

      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
