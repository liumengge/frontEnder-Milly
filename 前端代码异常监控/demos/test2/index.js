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

// debugger
// async function test_6() {
//   try {
//     let response = await fetch('http://no-user-here')
//     let user = await response.json()
//   } catch(err) {
//     // 捕获到 fetch 和 response.json 中的错误
//     console.log(err)
//   }
// }
// test_6()

// async function test_6() {
//   let response = await fetch('http://test-url')
// }

// // test_6() 变成了一个 rejected 的 promise
// test_6().catch((err) => {
//   console.log(err)
// })  // TypeError: failed to fetch

// window.addEventListener('unhandledrejection', function(event) {
//   // 这个事件对象有两个特殊的属性：
//   console.log(event.promise); // [object Promise] - 生成该全局 error 的 promise
//   console.log(event.reason); // Error: Whoops! - 未处理的 error 对象
// })

window.onunhandledrejection = function(event) {
  console.log(event)
  console.log(event.promise)
  console.log(event.reason)
}

window.onerror = function(message, source, line, col, error) {
  console.log('异常描述信息', message)
  console.log('出现异常的脚本文件', source)
  console.log('异常所在文件行列号', line, col)
  console.log('异常对象', error)
}

// function test_7() {
//   test_6()
// }

// test_7()

// async function test_8() {
//   let res = await test_9()
// }
// test_8()


;(async () => {
  try {
    // test_7()
    let res = await fetch('http://test-url')
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.log('ReferenceError, do something here')
    } else {
      // 其他类型的错误不知道怎么处理，抛出
      throw new Error(`出现一个不知该如何处理的错误：${error}`)
    }
  }
})()
