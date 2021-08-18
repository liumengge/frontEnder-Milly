// 发布订阅模式 : 先把需要的事情暂存，等事情发生了就让订阅的事情依次执行
const fs = require('fs')
const path = require('path')

let events = {
  arr: [],
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}

let person = {} as any
events.on(() => {
  // 计数
  if (Object.keys(person).length === 2) {
    console.log(person)
  }
})
events.on(() => {
  console.log('触发一次')
})
let filePath = path.join(__dirname, 'age.txt')
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    person.age = data
    events.emit()
  }
})

fs.readFile(path.join(__dirname, 'name.txt'), 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    person.name = data
    events.emit()
  }
})

export {}

// 发布订阅模式： 发布、订阅、第三方(arr)， 发布和订阅之间没有关联