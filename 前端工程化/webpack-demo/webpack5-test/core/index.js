const webpack = require('./webpack')  // 导入 webpack 方法，以便后续执行调用命令
// webpack配置
const config = require('../example/webpack.config')

// 1. 初始化参数， 根据配置文件和shell参数合成参数
// 2. 调用 webpack(options) 初始化compiler对象
const compiler = webpack(config)


// compiler 调用 run 方法进行打包
compiler.run((err, stats) => {
  if (err) {
    console.log(err, 'err')
  }
})
