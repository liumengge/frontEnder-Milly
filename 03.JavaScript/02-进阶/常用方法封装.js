function getType(data) {
  return Object.prototype.toString.call(data)
}

class Person {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    alert('hi')
  }
}

// console.log(getType('asdasd'))
// console.log(getType([1,2,3]))
// console.log(getType({a: 1, b:2}))
// console.log(getType(Date.now()))
// console.log(getType(new Date()))
// console.log(getType(function a(){}))
// console.log(getType(new Person('Milly')))

// 数组去重
function arrayUnique(arr) {
  const obj = {}
  return arr.filter(item => {
    if(!obj[item]) {
      obj[item] = true
      return true
    }
  })
}

let test1 = [1, 2, 2, 2, 3, 4, 5, 5, 5, 6]
// console.log(arrayUnique(test1))

function arrayUnique1(arr) {
  const result = []
  arr.forEach((item) => {
    if(result.indexOf(item) === -1) {
      result.push(item)
    }
  })
  return result
}

// console.log(arrayUnique1([1, 1, 1, 2, 3, 4, 5, 6, 7, 8]))

String.prototype.unique = function () {
  let result = ''
  const obj = {}
  const len = this.length
  for (let i = 0; i < len; i++) {
    if (!obj[this[i]]) {
      result += this[i]
      obj[this[i]] = true
    }
  }
  return result
}

// console.log('12222321231121'.unique())


function strUnique(str) {
  return str.replace(/(\w)\1+/g, '$1')
}

console.log(strUnique('1222231'))
