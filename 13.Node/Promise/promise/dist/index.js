// promise都是基于回调模式的

// 高阶函数
// 1. 函数的参数的函数
// 2. 函数的返回值是函数

Function.prototype.before = function (fn) {
  return (...arg) => {
    fn()  // 先调用before方法
    this(...arg)  // 再调用原有的core方法
  }
}

function core(a, b, c) {
  console.log(a, b, c)
}

let fn = core.before(() => {
  console.log('before core ... ')
})

fn(1, 2, 3)

