class Observer {
  constructor(value) {  // value为观测到的数据，即对应传入的data
    // 需要对value属性重新定义
    this.walk(value)
  }

  walk(data) {
    // 将对象中的所有key重新用defineReactive定义成响应式的
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key ])
    })
  }
}

function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newVlue === value) return
      value = newValue
    }
  })
}

export function observe(data) {
  // 只能观测对象类型，非对象类型无法观测
  if (typeof data !== 'object' || data === null) {
    return
  }

  // 通过类实现对数据的观测， 类可以方便扩展，会产生实例，实例可以作为一个唯一标识
  return new Observer(data)
}