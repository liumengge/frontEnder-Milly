 let oldArrayProtoMethod = Array.prototype
  
 // 不能直接改写数组原有方法，不可靠，因为只有被vue控制的数组才需要改写
 export let arrayMethods = Object.create(Array.prototype)  // 有一个继承的关系
 // arrayMethods.__proto__ = Array.prototype

let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort'
]

methods.forEach(method => {  // AOP切片编程：相当于中间切了一刀，中间加上了自己的逻辑
  arrayMethods[method] = function (...args) {  // 重写数组方法
    // 做一些事情
    let result = oldArrayProtoMethod[method].call(this, ...args)
    // 用户新增的数据是对象格式， 也需要进行拦截
    let inserted
    let ob = this.__ob__
    switch (method) {
      case 'push ':
      case 'unshift':
        inserted = args
        break;
      case 'splice':  // splice(0, 1, xxx)
        inserted = args.slice(2)  // 保证是一个数组
      default:
        break;
    }

    // 谁调用this就是谁，
    if (inserted) ob.observeArray(inserted)
    return result 
  }
})



