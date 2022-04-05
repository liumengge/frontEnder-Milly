// 抽象类 abstract 关键字

// 抽象类作为其他派生类的基类使用，一般不会直接被实例化 ？？？ 暂时不理解

// abstract: 定义抽象类，定义抽象类中的抽象方法
// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log(`name:${this.name}`)
  }

  abstract printMe(tes: string): void   // 抽象类，必须在派生类中实现，相当于在这里只声明了函数参数的类型和返回值的类型
}

class AADepartment extends Department {
  constructor() {
    super('sdsds')   
  }

  // 在派生类中实现基类中抽象类方法printMe的逻辑
  printMe(tes: string): void {
    console.log(tes)
  }

  generateReports(): void {
    console.log('asdasdasd')
  }
}

let dep: Department   // 可以创建对一个抽象类型的引用

// let dep2 = new Department()   // 不能创建 抽象类 的实例对象
let dep3 = new AADepartment()  // 可以创建抽象子类的实例对象且可以赋值
dep3.generateReports()  // 可以，该方法在 声明的抽象类中不存在，但是由抽象子类创建的实例对象也能正常调用

// 类 可以当作 接口 使用

class PPP {
  x: number
  y: number
}

interface P3 extends PPP {
  z: number
}

let p3: P3 = {
  x: 1,
  y: 2,
  z: 3
}








