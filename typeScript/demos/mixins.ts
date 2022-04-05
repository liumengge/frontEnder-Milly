// 混入

// mixins1
class Disposable {
  isDisposed: boolean
  dispose() {
    this.isDisposed = true
  }
}

// mixins2
class Activatable {
  isActive: boolean
  activate() {
    this.isActive = true
  }
  disactivate() {
    this.isActive = false
  }
}

// 创建一个新的类 TestObj, implements 表示 将 类 当作接口， 只使用其类型，不关心其实现
class TestObj implements Disposable, Activatable {

  // 为将要mixin捡来的属性方法创建出占位属性，这样会告诉编译器这些成员在运行时是可以用的
  isDisposed: boolean = false
  dispose: () => void

  isActive: boolean = false
  activate: () => void
  disactivate: () => void

  constructor() {
    setInterval(() => console.log(`${this.isActive}: ${this.isDisposed}`), 500)
  }

  interact() {
    this.activate()
  }
}

// 把mixins混入定义的类
applyMixins(TestObj, [Disposable, Activatable])

// applyMixins函数帮我们做混入操作。它会遍历mixins上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码
function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name]
    })
  })
}

let testObj = new TestObj()
setTimeout(() => testObj.interact(), 1000)






