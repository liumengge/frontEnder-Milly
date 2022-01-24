# upload-huge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```javascript
npm run serve  // 启动前端
npm run dev   // 启动服务端 
```

### 技术栈

- 前端：vue 2.6.11 + @vue/composition-api + element-ui
- 服务端：NodeJS

## 大文件上传demo简介

### 场景

大多数情况下，在上传大文件的时候如果不进行处理，前端只会发起一个请求，如果上传过程中有中断，则会中断整个上传业务，如果想要上传，需要从头开始。

### 思路分析

1. 分片上传
- 将文件转换为二进制流的格式，流可以切割，可以将二进制流切割成多份
- 组装和分割块同等数量的请求，并行或者串行发送请求
- 当监听到所有请求都成功发送，再向服务器发送一个"合并"的请求

2. 断点续传

### 参考资料

- [Blob.prototype.slice]()
- [写给新手前端的各种文件上传攻略，从小图片到大文件断点续传](https://juejin.cn/post/6844903968338870285)





