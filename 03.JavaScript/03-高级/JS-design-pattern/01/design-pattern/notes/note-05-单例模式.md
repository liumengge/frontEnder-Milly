## 什么是单例模式

- 系统中被唯一使用
- 一个类只有一个实例

单例模式需要用到java的特性(private)，ES6中没有(typescript除外)。

java中的单例模式:
```java
public class SingleObject {
  // 私有化构造函数，外部不能new，只有内部可以new
  private SingleObject() {}

  // 唯一被new出来的对象
  private SingleObject instance = null;

  // 获取对象的唯一接口
  public SingleObject getInstance() {
    if (instance == null) {
      // 只被 new 一次
      instance = new SingleObject()
    }
    return instance
  }

  // 对象方法
  public void login(username, password) {
    System.out.println('login...')
  }
}
```
从上述代码可以看出，不能从SingleObject类外部通过new的方式创建对象，只能通过调用`SingleObject.getInstance()`的方式来创建实例对象，且这个实例对象只会被new一次。所以，单例模式中一个类就只有一个实例(instance)，并提供一个访问这个instance的全局访问点(getInstance)

## 示例

- 登录框，项目中应该只存在一个登录框

```javascript
class LoginForm {
  constructor() {
    // 登录框显示状态
    this.state = 'hide'
  }

  // 显示登录框
  show() {
    if (this.state === 'show') {
      alert('已经显示')
      return
    }
    this.state = 'show'
    console.log('登录框显示成功')
  }

  // 隐藏登录框
  hide() {
    if (this.state === 'hide') {
      alert('已经隐藏')
      return
    }
    this.state = 'hide'
    console.log('登录框隐藏成功')
  }
}

// 全局访问点
LoginForm.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new LoginForm()
    }
    return instance
  }
})()

let obj1 = LoginForm.getInstance()
obj1.show() // 登录框显示成功

let obj2 = LoginForm.getInstance()
obj2.hide() // 登录框隐藏成功

console.log(obj1 === obj2) // true
```

- 购物车