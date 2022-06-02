const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    compress: false,
    port: 8888,
    // 虚拟路径，bundle.js 文件没有真正生成
    publicPath: '/xuni/'
  }
}