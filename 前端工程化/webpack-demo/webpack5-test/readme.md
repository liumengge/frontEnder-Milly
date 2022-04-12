> 以该项目学习webpack5打包核心流程

## 项目目录

- core: 存放webpack核心代码
- example：存放用来打包的示例代码
  - src/entry1.js：第一个入口文件
  - src/entry2.js：第二个入口文件
  - src/index.js：模块文件
- loaders：自定义loader
- plugins：自定义插件
  
## 参数初始化

给webpack传递打包参数的方式：
  - cli命令行：`webpack --mode=production`  表示调用webpack命令执行打包，传入mode参数值为production
  - webpack配置文件：即在项目根目录下的配置文件webpack.config.js中导出一个webpack配置对象
  ```javascript
  const path = require('path')

  module.exports = {
    mode: 'development',
    entry: {  // 打包入口
      main: path.resolve(__dirname, './src/entry1.js'),
      second: path.resolve(__dirname, './src/entry2.js'),
    },
    devtool: false,
    // 基础目录，绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)
    // 换而言之entry和loader的所有相对路径都是相对于这个路径而言的
    context: process.cwd(),
    output: {  // 打包后的结果输出目录
      path: path.resolve(__dirname, './build'),
      filename: '[name].js',
    },
    plugins: [new PluginA(), new PluginB()],
    resolve: {
      extensions: ['.js', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.js/,
          use: [
            // 使用自己loader有三种方式 这里仅仅是一种
            path.resolve(__dirname, '../loaders/loader-1.js'),
            path.resolve(__dirname, '../loaders/loader-2.js'),
          ],
        },
      ],
    },
  }
  ```

## 合并参数


