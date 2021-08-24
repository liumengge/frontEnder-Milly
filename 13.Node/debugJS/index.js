// 1. 引入debug得到一个工厂函数

const createdDebug = require('debug')

// 2. 利用这个工厂函数  返回得到一个debug函数(当做console.log)
let debug = createdDebug('debugger')

// 3. 使用这个debug在代码中输出日志
debug('输出一段日志内容')

// 4. 启动程序，并设置环境变量
// DEBUG=debugger node index.js