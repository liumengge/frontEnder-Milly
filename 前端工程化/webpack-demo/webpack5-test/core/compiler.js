// Compiler 类实现核心编译逻辑

const { SyncHook } = require('tapable')
const { toUnixPath } = require('./utils')
const path = require('path')
const webpack = require('./webpack')
class Compiler {
  constructor(options) {
    // options 为合并后的 webpack 配置
    this.options = options
    // 相对路径 根路径, 项目启动的目录路径，webpack.config.js中的context默认是process.cwd()
    // 任何 entry 和 loader 中的相对路径都是针对 context 这个参数的相对路径
    this.rootPath = this.options.context || toUnixPath(process.cwd())

    // 创建 plugin hooks
    this.hooks = {
      // 开始编译时的钩子
      run: new SyncHook(),
      // 输出asset到output目录之前执行的钩子(写入文件之前)
      emit: new SyncHook(),
      // compilation完成时执行的钩子，编译全部完成执行
      done: new SyncHook()
    }
    // 上述SyncHook()方法可以理解为一个Emitter Event类，当通过new SyncHook()返回一个对象实例后，
    // 可以通过this.hook.run.tap('name',callback)方法为这个对象上添加事件监听，
    // 然后在通过this.hook.run.call()执行所有tap注册的事件
    // 通过Compiler类返回的实例对象上compiler.hooks.run.tap可以注册钩子


  }

  // 启动编译，同时接收外部传递的callback
  run(callback) {
    // 触发开始编译的 plugin
    // 在_loadePlugins函数中对于每一个传入的插件在compiler实例对象中进行了订阅，当调用run方法时，等于真正开始执行编译
    // 这个阶段相当于我们需要告诉订阅者，发布开始执行的订阅。
    // 此时通过 this.hooks.run.call() 执行关于 run 的所有 tap 监听方法，从而触发对应的 plugin 逻辑
    this.hooks.run.call()

    // 获取入口配置对象
    const entry = this.getEntry()
  }

  // 获取入口文件路径
  /**
   * webpack.config.js 配置文件中entry的配置方式有两种，
      一种是单入口，entry为字符串，
      一种是多入口，entry是对象，其中key为入口名称，value为入口文件路径
    
    在webpack内部 entry会被转化为
    entry: {
      main: 'entry1.js'
    }
    或者
    entry: {
      'entry1': './entry1.js',
      'entry2': '/user/webpack/example/src/entry2.js'
    }

    通过 getEntry 方法，转化为
    {
      [entryName模块名]: [entryAbsolutePath模块绝对路径]
    }

   */
  getEntry() {
    let entry = Object.create(null)

    const { entry: optionsEntry } = this.options
    if(typeof optionsEntry === 'string') {
      // 单入口
      entry['main'] = optionsEntry
    } else {
      // 多入口配置
      entry = optionsEntry
    }

    // 将entry变成绝对路径
    Object.keys(entry).forEach(key => {
      const value = entry[key]
      if(!path.isAbsolute(value)) {
        // 转为绝对路径, 分隔符处理为 /
        entry[key] = toUnixPath(path.join(this.rootPath, value))
      }
    })

    return entry
  }
}

module.exports = Compiler