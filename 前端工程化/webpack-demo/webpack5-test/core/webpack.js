// webpack Node Api 中是通过webpack()方法得到compiler对象的

// 如：
// const webpack = require('webpack')
// const compiler = webpack({
//   // 
// })

// compiler.run((err, stats) => {
//   // ...
//   compiler.close((closeErr) => {
//     // ...
//   })
// })

function webpack(options) {
  // 1. 合并参数 得到合并后的参数 mergeOptions
  const mergeOptions = _mergeOptions(options)
  // 2. 创建 compiler 对象
  const compiler = new compiler(mergeOptions)
  // 3. 加载插件，注册插件
  _loadPlugin(options.plugins, compiler)

  return compiler
}

// 合并参数
function _mergeOptions(options) {

  // console.log(process.argv.slice(2), '获取执行shell命令时传入的参数')
  const shellOptions = process.argv.slice(2).reduce((option, argv) => {
    // argv -> --mode=production
    const [key, value] = argv.split('=')
    if (key && value) {
      const parseKey = key.slice(2)
      option[parseKey] = value
    }
    return option
  }, {})

  return { ...options, ...shellOptions }
}

// 加载插件函数
function _loadPlugin(plugins, compiler) {
  // plugins配置的时候是数组
  if (plugins && Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      // 任何一个webpack插件都是一个类(当然类本质上都是funciton的语法糖)，每个插件都必须存在一个apply方法
      plugin.apply(compiler)
    })
  }
}

module.exports = webpack
