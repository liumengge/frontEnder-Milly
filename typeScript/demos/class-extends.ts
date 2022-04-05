// ts中，程序里定义的成员默认是public的
// 成员被标记为private时，不能在声明它的类的外部访问，只允许在类内被使用
// protected: 允许在类内及继承的子类中使用
// public：允许在类的内外被调用

// 以上三种访问类型是什么作用？使用场景是什么？

class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    // 在构造函数里访问 this 的属性之前，一定要调用 super()。
    // 这个是TypeScript强制执行的一条重要规则
    super(name) // 在构造函数中调用super，表示指定基类的构造函数
  }
  // 在子类中重写从超类中继承过来的方法
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log('Horse...')
    super.move(distanceInMeters)
  }
}

// 使用
let sam = new Snake('Sammy the Python')
// 即使tom被声明为Animal类型，但是它是Horse的实例对象，调用move的时候还是调用的自己重写的move方法
let tom: Animal = new Horse('Tommy the Palomino')

console.log(sam.name, '访问public成员name')  // 类外部
sam.move()
tom.move(34)

// private

class Animal2 {
  private name: string
  constructor(theName) {
    this.name = theName
  }
}

// let sam2 = new Animal2('sam2').name
// console.log(sam2)


// 参数属性
class Octopus {
  readonly name: string  // 只读成员 name
  readonly numberOfLegs: number = 8
  constructor(theName: string) {   // 参数为 theName 的构造函数
    console.log(theName)
    this.name = theName  // 调用构造函数时，立即将 theName 参数的值 赋值给 Octopus 的只读成员 name
  }
}

let da = new Octopus("Man with the 8 strong legs")
// da.name = "pdf"   // 只读属性，不可修改

// 修改: 在一个地方定义并初始化一个成员
class Octopus2 {
  readonly numberOfLegs: number = 8
  // 参数属性
  constructor(readonly name: string) {
    console.log(this.name)
  }
}

let da2 = new Octopus2('shishis')
console.log(da2)

// 参数属性：通过给构造函数参数前面添加一个访问限定符来声明

