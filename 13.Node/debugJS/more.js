// 多模块debug

// 主程序
const debug = require('debug')('main')

debug('主程序开始执行')
// 分支模块
require('./moduleA')
require('./moduleB')


// 启动并设置命名空间
// DEBUG=main,moduelA,moduleB node more.js
