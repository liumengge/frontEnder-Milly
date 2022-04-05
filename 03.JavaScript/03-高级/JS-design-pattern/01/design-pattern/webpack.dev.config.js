const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  module: {
    rules: [
      {
        test: /.\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './release')
    },
    open: true,
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}