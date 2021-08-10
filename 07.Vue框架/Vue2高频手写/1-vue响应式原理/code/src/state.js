// vue的数据  data computed watch

import { observe } from "./observer/index"

export function initState(vm) {
  // 将所有数据都定义到vm属性上，并且后续更改需要触发视图更新
  const opts = vm.$options  // 获取用户传入的属性
  if (opts.data) {  // 数据的初始化
    initData(vm)
  }
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

function initData(vm) {
  // 数据劫持
  // console.log(vm)
  let data = vm.$options.data

  // 判断data类型,如果是函数，获取函数返回值作为对象  this指向当前实例
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  // 通过vm._data获取劫持后的数据，用户就可以拿到_data了
  // 将_data中的数据全部放到vm上
  for (const key in data) {
    proxy(vm, '_data', key )  // vm.name  <=> vm._data.name
  }

  // 观测对象
  observe(data)
}