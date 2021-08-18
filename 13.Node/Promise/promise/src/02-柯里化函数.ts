// 柯里化函数

// 判断一个变量的类型
// typeof
// constructor
// instanceof
// Object.prototype.toString.call

// 柯里化：让函数的功能更具体 - 核心就是保留参数
// type ReturnFn = (val:unknown) => boolean
// let utils:Record<'isString' | 'isNumber' | 'isBoolean', ReturnFn> = {} as any
// function isType(typing:string) {  // 高阶函数可以用于保存参数 - 闭包
//   return function (val:unknown) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`
//   }
// }

// ['String', 'Number', 'Boolean'].forEach(type => {
//   utils['is' + type] = isType(type)  // 闭包
// })

// console.log(utils.isString('hello'))
// console.log(utils.isNumber(123))

// 反柯里化： 让函数的范围变大

// 实现一个通用的柯里化函数， 可以自动的将一个函数转换成多次传递参数 lodash
const curring = (fn) => {
  const exec = (sumArgs) => {
    return sumArgs.length >= fn.length ? fn(...sumArgs) : (...args) => exec([...sumArgs, ...args])
  }
  return exec([])  // 用于收集每次执行时传入的参数， 第一次默认是空的
}

function sum(a, b, c, d) {  // 参数固定的情况做柯里化
  return a+b+c+d
}

console.log(curring(sum)(1)(2, 3)(4))