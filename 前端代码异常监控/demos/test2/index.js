// const fs = require('fs')

// fs.readFile('readme.milly', (err, data) => {
//   if(err) {
//     throw err
//   }
// })
// console.log('Milly')

// const fs = require('fs')

// 捕获同步代码异常
// try {
//   fs.readFileSync('readme.milly')
//   console.log('Milly')
// } catch (error) {
//   // console.log('catch', error)
//   console.trace('catch', error)
// }

// 能否捕获异步代码异常

// try {
//   fs.readFile('readme.milly', (err, data) => {
//     if(err) {
//       throw err
//     }
//   })
//   console.log('Milly')
// } catch (error) {
//   console.trace('catch', error)
// }

// fs.readFile('readme.milly', (err, data) => {
//   try {
//     if (err) {
//       throw err
//     }
//   } catch (error) {
//     console.log('catch', error)
//   }
// })

// 
// debugger
// setTimeout(() => {
//   try {
//     throw new Error('This is an error')
//   } catch (error) {
//     console.log('catch error', error)
//   }
  
// }, 1000)

// new Promise((resolve, reject) => {
//   // reject('This is an error in executor')
//   // throw new Error('This is an error in executor')
//   resolve('test')
// }).then((res) => {
//   throw new Error('This is an error in handler')
// }).catch((err) => {
//   console.log('catch error', err)
// })


async function test() {
  try {
    let response = await fetch('/no-user-here')
    let user = await response.json()
  } catch(err) {
    // 捕获到 fetch 和 response.json 中的错误
    alert(err)
  }
}
test()