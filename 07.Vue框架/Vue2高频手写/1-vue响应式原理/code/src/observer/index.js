import { arrayMethods } from "./array"

class Observer {
  constructor(value) {  // value为观测到的数据，即对应传入的data

    // 这里的操作是为了可以在array.js中 拿到observeArray方法,但是如果这样做就会无限循环了
    // value.__ob__ = this  // 这里的this指的是observer实例
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false,  // 不可枚举 不能被循环
      configurable: false  // 不可删除
    })

    // 需要对value属性重新定义

    // value 可能是对象，可能是数组，分类处理
    if (Array.isArray(value)) {
      // 数组不使用defineProperty进行代理，性能不好

      // push shift reverse sort
      // 相当于改写了数组本身的原型链，会先找arrayMethods，arrayMethods中的方法是改写后的
      // 如果本身没有改写过，还可以去调用数组原型上原来的方法
      // value.__proto__ = arrayMethods  这个效果与下边的代码等效 
      Object.setPrototypeOf(value, arrayMethods)  // 循环将属性赋予上去
      // 观测数组中的每一项，如果是对象，对象修改了应该也要被拦截到
      this.observeArray(value)  // 监控原有数组中的对象
    } else {
      this.walk(value)
    }
  }

  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i])
    }
  }

  walk(data) {
    // 将对象中的所有key重新用defineReactive定义成响应式的
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key ])
    })
  }
}

function defineReactive(data, key, value) {  // vue2中数据嵌套不要过深， 过深浪费性能

  // value 也可能是一个对象
  observe(value)  // 对结果递归拦截

  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newVlue === value) return
      // 如果用户设置的是一个对象，就继续将对象设置为响应式
      observe(newValue)
      value = newValue
    }
  })
}

export function observe(data) {
  // 只能观测对象类型，非对象类型无法观测
  if (typeof data !== 'object' || data === null) {
    return
  }

  // 如果有__ob__属性就表示已经被观测过了
  if (data.__ob__) {  // 防止循环引用
    return
  }

  // 通过类实现对数据的观测， 类可以方便扩展，会产生实例，实例可以作为一个唯一标识
  return new Observer(data)
}