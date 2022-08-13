// 存取器：TS 支持通过 getters/setters 来截取对对象成员的访问

class Employee {
  fullName: string
}

let emp = new Employee()
emp.fullName = "Bob"

if(emp.fullName) {
  console.log(emp.fullName)
}


let password = "secret code"

class Employee1 {
  private _fullName: string

  get fullName(): string {  // 可以通过 属性 的方式访问 类 的 私有属性
    return this._fullName + 'Liu'  // 加密返回，保护私有属性this._fullName
  }

  set fullName(newName: string) {
    if(password && password === "secret code") {
      this._fullName = newName
    } else {
      console.log('No authorize!')
    }
  }
}

let emp1 = new Employee1()
emp1.fullName = 'Milly'

if (emp1.fullName) {
  console.log(emp1.fullName)
}

// 注意事项：

// 存取器要求将编译器设置为输出ECMAScript 5或者更高，不支持降级到ECMAScript 3.
// 只带有get不带有set的存取器自动被推断为readonly


// 静态属性: 存在于类本身上而不是类的实例上

class Grid {
  // 静态属性， 使用的时候需要 类名.属性 的形式
  static origin = {x: 0, y: 0}
  calDistance(point: {x: number, y: number}) {
    let xD = (point.x - Grid.origin.x)
    let yD = (point.y -Grid.origin.y)
    return Math.sqrt(xD * xD + yD * yD)
  }
  constructor(scale: number) {}
}

let g1 = new Grid(1.0)
let g2 = new Grid(5.0)

console.log(g1.calDistance({x: 1, y: 2}))
console.log(g2.calDistance({x: 2, y: 3}))

// 单例模式
class Demo {
  private static instance: Demo
  private constructor() {}  // 外部无法使用new Demo()
  static getInstance() {  // 将方法挂载 类 上，而不是挂在类的实例上
    if(!this.instance) {
      this.instance = new Demo()
    }
    return this.instance
  }
}

const demo1 = Demo.getInstance()  // 
const demo2 = Demo.getInstance()