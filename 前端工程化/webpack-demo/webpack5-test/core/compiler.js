// Compiler 类实现核心编译逻辑
class Compiler {
  constructor(options) {
    this.options = options
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

  }
}

module.exports = Compiler