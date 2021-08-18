// 观察者模式：基于发布订阅模式
// 观察者 和 被观察者， 两者之间是有关联的

class Subject {  // 被观察者
  name:string  // 类实例上有一个name属性
  state:string
  constructor(name) {
    this.name = name
    this.state = 'happy'
  }
  attach() {

  }
}

class Observer { // 观察者
  name:string
  constructor(name) {

  }
}

let baby = new Subject('小宝宝')
let o1 = new Observer('')