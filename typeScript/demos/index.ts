
interface Point {
  x: number,
  y: number
}

let b: number = 123

function testD(data: Point) {
  console.log("qwed")
  return data.x + data.y
}

testD({x: 123, y: 456})

// 类
class Person {}
const pp: Person = new Person()

// 函数: 参数类型+返回值类型
// 可选参数要在必填参数后面
const getById: (x: number, y?: number) => number = (x, y) => {
  console.log(x, y)
  return 123
}

console.log(getById(1))
console.log(getById(1, 2))
// console.log(getById(1, 2, 3))  // 报错， 参数太多

// 对象
const obj: {
  name: string,
  age: number
} = {
  name: 'sds',
  age: 2
}


// 数组
const arr: (number | string)[] = [1, 2, 3]
const strArr: string[] = ['a', 'b', 'c']
const undefinedArr: undefined[] = [undefined]
const objArr: {name: string, age: number}[] = [{
  name: 'Milly',
  age: 18
}]

// 类型别名 type alias
type User = {name: string, age: number}

const obj2Arr: User[] = [{
  name: 'Milly',
  age: 18
}]


class testClass {
  name: string
  age: number
}

// 该数组中的第二个元素，不是通过new testClass()创建出来的实例对象，但是也是可以的，只要内部属性及其类型是一致的即可
const obj3Arr: testClass[] = [
  new testClass(),
  {
    name: 'Milly',
    age: 18
  }
]

// 元组 tuple: 数组长度一定，且每个元素的类型是固定的

const tTuple: [string, string, number] = ['milly', 'xiaoyi', 18]

// 数组使用场景：从csv导入数据，每列元素类型是一定的

const tList: [string, string, number][] = [
  ['milly', 'xiaoyi', 18],
  ['dd', 'xiaoyi', 18],
  ['mama', 'xiaoyi', 18]
]

// 类型兼容性
