// 插件 B
class PluginB {
  // 在每个插件的apply方法上通过tap在编译准备阶段(也就是调用webpack()函数时)进行订阅对应的事件，
  // 当编译执行到一定阶段时发布对应的事件告诉订阅者去执行监听的事件，
  // 从而达到在编译阶段的不同生命周期内去触发对应的plugin
  apply(compiler) {
    // 注册事件
    // 关于webpack插件本质上就是通过发布订阅的模式，通过compiler上监听事件
    // 然后再打包编译过程中触发监听的事件从而添加一定的逻辑影响打包结果
    // compiler对象上存放着本次打包的所有相关属性
    compiler.hooks.done.tap('Plugin B', () => {
      console.log('PluginB')
    })
  }
}

module.exports = PluginB