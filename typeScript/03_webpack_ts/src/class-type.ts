// 类类型：类的类型，可以通过接口实现
// 
(() => {
  // 定义一个接口
  interface IFly {
    // 方法中没有任何实现
    fly(): void
  }

  // 定义一个类，这个类的类型就是上面定义的接口，也可以理解为：IFly 接口约束了当前的这个类
  class Person implements IFly {
    // 实现接口中的方法
    fly() {
      console.log('fly')
    }
  }

  const per = new Person()
  per.fly()

  // 定义一个接口
  interface ISwim {
    swim(): void
  }

  // 定义一个类，这个类的类型就是 IFly 和 ISwim
  // 当前这个类可以实现多个接口，一个类同时也可以被多个接口进行约束
  class Person2 implements IFly, ISwim {
    // 实现接口中的方法
    fly() {
      console.log('fly')
    }
    swim(): void {
      console.log('swim')
    }
  }
  const per2 = new Person2()
  per2.fly()
  per2.swim()

  // 类可以通过接口的方式来定义当前这个类的类型，
  // 类可以实现一个或多个接口，注意：接口中的内容都要真正实现

  // 接口可以继承其他的多个接口
  // 定义一个接口，继承其他多个接口
  interface IFlyAndSwim extends IFly, ISwim {}

  // 定义一个类，直接实现 IFlyAndSwim 这个接口
  class Person3 implements IFlyAndSwim {
    // 实现接口中的方法
    fly() {
      console.log('fly')
    }
    swim(): void {
      console.log('swim')
    }
  }

  const per3 = new Person3()
  per3.fly()
  per3.swim()

  // 注意： 接口与接口之前是继承(extends)，类与接口之前是实现(implements)
})()