// 多态：父类型的引用指向了子类型的对象
//    不同类型的对象针对相同的方法，产生了不同的行为
(() => {
  // 定义一个父类
  class Animal {
    // 定义属性
    name: string

    constructor(name: string) {
      // 构造器函数中更新属性
      this.name = name
    }

    run(distance: number = 0) {
      console.log(`${ this.name } 跑了${ distance } 米`)
    }
  }

  // 定义一个子类
  class Dog extends Animal {
    constructor(name: string) {
      // 调用父类的构造函数
      super(name)
    }

    // 重写 run
    run(distance: number = 5) {
      console.log(`${ this.name } 跑了${ distance } 米`)
    }
  }

  // 定义一个子类
  class Pig extends Animal {
    constructor(name: string) {
      // 调用父类的构造函数
      super(name)
    }

    // 重写 run
    run(distance: number = 10) {
      console.log(`${ this.name } 跑了${ distance } 米`)
    }
  }

  class Horse extends Animal {
    constructor (name: string) {
      // 调用父类型构造方法
      super(name)
    }
  
    // 重写父类型的方法
    run (distance: number = 50) {
      console.log('dashing...')
      // 调用父类型的一般方法
      super.run(distance)
    }
  
    xxx () {
      console.log('xxx()')
    }
  }

  const ani: Animal = new Animal('动物')
  ani.run()

  const dog: Dog = new Dog('大黄')
  dog.run()

  const pig: Pig = new Pig('佩奇')
  pig.run()

  // 父类型引用指向子类型的实例 ==> 多态
  const tom: Animal = new Dog('ho22')
  tom.run()
  /* 如果子类型没有扩展的方法, 可以让子类型引用指向父类型的实例 */
  const tom3: Pig = new Animal('tom3')
  tom3.run()

  /* 如果子类型有扩展的方法, 不能让子类型引用指向父类型的实例 */
  // const tom2: Horse = new Animal('tom2')
  // tom2.run()

})()