const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
// const UnusedWebpackPlugin = require("unused-webpack-plugin")

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
    port: 8000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new BundleAnalyzerPlugin(),
    // new UnusedWebpackPlugin({
    //   directories: [path.join(__dirname, "src")],
    //   root: path.join(__dirname, "../"),
    // }),
  ]
}