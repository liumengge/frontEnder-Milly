// promise都是基于回调模式的

// 高阶函数
// 1. 函数的参数的函数
// 2. 函数的返回值是函数

// 比如：需要在原有的函数调用之前执行一些额外的逻辑，实现方式如下
type Callback = () => void
type ReturenFn = (...args:any[]) => void
declare global {
  interface Function{  // 接口合并
    before(fn:Callback):ReturenFn
  }
}

Function.prototype.before = function (fn) {
  return (...args) => {
    fn()  // 先调用before方法
    this(...args)  // 再调用原有的core方法
  }
}

function core(...args) {
  console.log('core....', ...args)
}

let fn = core.before(() => {
  console.log('before core ... ')
})

fn(1, 2, 3)

export {}
