<template>
<el-container>
  <el-header>大文件上传</el-header>
  <el-main>
    <div id="app">
      <div style="text-align: center;">
        <input type="file" :disabled="status !== Status.wait" @change="handleFileChange" />
        <el-button type="primary" icon="el-icon-upload" style="font-size: 20px;" @click="handleUpload" :disabled="uploadDisabled">上传</el-button>
        <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
        <el-button v-else style="font-size: 20px;" :disabled="status !== Status.uploading || !container.hash" @click="handlePause">暂停</el-button>
      </div>
      <el-row style="margin-top: 20px;">
        <el-col :span="4" :offset="4">
          <el-card style="margin: 0 auto">
            <el-progress type="circle" :percentage="hashPercentage" />
            <div style="padding: 14px;">
              <span>计算hash</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4" :offset="6">
          <el-card>
            <el-progress type="circle" :percentage="fakeUploadPercentage" />
            <div style="padding: 14px;">
              <span>总进度</span>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-table :data="data" style="margin-top: 20px;">
        <el-table-column type="index" />
        <el-table-column prop="hash" label="切片hash" />
        <el-table-column label="大小(KB)" width="120">
          <template v-slot="{ row }">
            {{ row.size | transformByte }}
          </template>
        </el-table-column>
        <el-table-column label="进度">
          <template v-slot="{ row }">
            <el-progress :percentage="row.percentage" color="#909399" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</el-container>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'

export default {
  name: "app",
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0))
    }
  },
  setup(_, { root }) {
    const Message = root.$$message
    const container = ref({
      file: null,
      hash: "",
      worker: null
    })
    const SIZE = 10 * 1024 * 1024  // 切片大小
    const Status = {
      wait: "wait",
      pause: "pause",
      uploading: "uploading"
    }

    const hashPercentage = ref(0)
    const data = ref([])
    const requestList = ref([])
    const status = ref(Status.wait)
    // 当暂停时会取消 xhr 导致进度条后退, 定义一个假的进度条
    const fakeUploadPercentage = ref(0)

    const uploadDisabled = computed(() => {
      return (
        !container.value.file || [Status.pause, Status.uploading].includes(status.value)
      )
    })

    const uploadPercentage = computed(() => {
      if (!container.value.file || !data.value.length) return 0;
      const loaded = data.value
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur)
      return parseInt((loaded / container.value.file.size).toFixed(2))
    })

    watch(() => uploadPercentage.value, (newValue) => {
      if (newValue > fakeUploadPercentage.value) {
        fakeUploadPercentage.value = newValue
      }
    })

    function resetData() {
      requestList?.value.forEach(xhr => xhr?.abort())
      requestList.value = []
      if (container.value.worker) {
        container.value.worker.onmessage = null
      }
    }

    // xhr
    function request({
      url,
      method = "post",
      data,
      headers = {},
      onProgress = e => e,
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = onProgress
        xhr.open(method, url)
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        )
        xhr.send(data)
        xhr.onload = e => {
          // 将请求成功的 xhr 从列表中删除
          if (requestList) {
            const xhrIndex = requestList?.findIndex(item => item === xhr)
            requestList?.splice(xhrIndex, 1)
          }
          resolve({ data: e.target.response })
        }
        // 暴露当前 xhr 给外部
        requestList?.push(xhr)
      })
    }

    // 通知服务端合并切片
    async function mergeRequest() {
      await request({
        url: "http://localhost:3000/merge",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          size: SIZE,
          fileHash: container.value.hash,
          filename: container.value.file.name
        })
      });
      Message.success("上传成功")
      status.value = Status.wait
    }

    // 用闭包保存每个 chunk 的进度数据
    function createProgressHandler(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    }

    // 上传切片，同时过滤已上传的切片
    async function uploadChunks(uploadedList = []) {
      const requestList = data.value
        .filter(({ hash }) => !uploadedList?.includes(hash))
        .map(({ chunk, hash, index }) => {
          const formData = new FormData()
          formData.append("chunk", chunk)
          formData.append("hash", hash)
          formData.append("filename", container.value.file.name)
          formData.append("fileHash", container.value.hash)
          return { formData, index }
        })
        .map(async ({ formData, index }) =>
          request({
            url: "http://localhost:3000",
            data: formData,
            onProgress: createProgressHandler(data.value[index]),
            requestList: requestList?.value
          })
        )
      await Promise.all(requestList)
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 合并切片
      if (uploadedList?.length + requestList?.length === data.value.length) {
        await mergeRequest()
      }
    }

    // 根据 hash 验证文件是否曾经已经被上传过
    // 没有才进行上传
    async function verifyUpload(filename, fileHash) {
      const { data } = await request({
        url: "http://localhost:3000/verify",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          filename,
          fileHash
        })
      })
      return JSON.parse(data)
    }

    // 生成文件切片
    function createFileChunk(file, size = SIZE) {
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
      }
      return fileChunkList
    }

    // 生成文件 hash（web-worker）
    function calculateHash(fileChunkList) {
      return new Promise(resolve => {
        container.value.worker = new Worker("/hash.js")
        container.value.worker.postMessage({ fileChunkList })
        container.value.worker.onmessage = e => {
          const { percentage, hash } = e.data
          hashPercentage.value = percentage
          if (hash) {
            resolve(hash)
          }
        }
      })
    }

    return {
      Status,
      container,
      hashPercentage,
      data,
      requestList,
      status,
      fakeUploadPercentage,
      uploadDisabled,
      uploadPercentage,

      // 暂停
      handlePause() {
        status.value = Status.pause
        resetData()
      },
      async handleResume() {
        status.value = Status.uploading
        const { uploadedList } = await verifyUpload(
          container.value.file.name,
          container.value.hash
        )
        await uploadChunks(uploadedList)
      },
      handleFileChange(e) {
        const [file] = e.target.files
        if (!file) return
        resetData()
        // Object.assign(this.$data, this.$options.data())
        container.value.file = file
      },
      // 文件上传
      async handleUpload() {
        if (!container.value.file) return
        status.value = Status.uploading
        const fileChunkList = createFileChunk(container.value.file)
        container.value.hash = await calculateHash(fileChunkList)

        const { shouldUpload, uploadedList } = await verifyUpload(
          container.value.file.name,
          container.value.hash
        )
        if (!shouldUpload) {
          Message.success("秒传：上传成功")
          status.value = Status.wait
          return
        }

        data.value = fileChunkList.map(({ file }, index) => ({
          fileHash: container.value.hash,
          index,
          hash: container.value.hash + "-" + index,
          chunk: file,
          size: file.size,
          percentage: uploadedList?.includes(index) ? 100 : 0
        }))

        await uploadChunks(uploadedList)
      }
    }
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  text-align: left;
  line-height: 50px;
}
.el-card__body {
  text-align: center;
}
</style>