// promise 解决了什么问题？
// 1. 异步并发
// 2. 回调地狱

const fs = require('fs')
const path = require('path')

let obj = {} as any
// 异步文件内容读取
// 文件路径这样写，默认是找根路径下的对应文件
// fs.readFile('./age.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//     obj.age = data
//   }
// })


function after(times, callback) {
  let obj = {} as any
  return function (key:string, value:number|string) {
    obj[key] = value
    --times === 0 && callback(obj)
  }
}

let fn = after(2, function (obj) {
  console.log(obj)
})

let filePath = path.join(__dirname, 'age.txt')
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    fn('age', data)
  }
})

fs.readFile(path.join(__dirname, 'name.txt'), 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    fn('name', data)
  }
})
