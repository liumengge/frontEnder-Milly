1. 注意版本：

```javascript
"html-webpack-plugin": "^5.5.0",
"webpack": "^5.71.0",
"webpack-cli": "^4.9.2",
"webpack-dev-server": "^4.8.0"
```
node 版本： 14.18.1

2. 注意webpack配置文件中写法
  
```javascript
devServer: {
  static: {   // 对应 contentBase
    directory: path.join(__dirname, './release')
  },
  open: true,
  port: 8000
},
```

3. babel版本问题：

```javascript
"@babel/core": "^7.17.8",
"@babel/plugin-transform-runtime": "^7.17.0",
"@babel/polyfill": "^7.12.1",
"@babel/preset-env": "^7.16.11",
"babel-loader": "^8.2.4",
```

babel配置：
```javascript
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage", // 在每个文件中使用polyfill时，为polyfill添加特定导入。利用捆绑器只加载一次相同的polyfill
      "modules": false, // 启用将ES6模块语法转换为其他模块类型，设置为false不会转换模块
      "targets": {
        "browsers": "last 2 versions, not ie <= 9"
      }
    }]
  ]
}
```

## 面向对象
### 封装
> 数据的权限和保密

JS中没有class，类就是一个函数：
```javascript
var Book = function (id, bookname, price) {
  this.id = id
  this.bookname = bookname
  this.price = price
}

Book.prototype.display = function () {
  // 显示这本书的信息
}
// 或者
Book.prototype = {
  display: function () {
    // 展示这本书的信息
  }
}

// 通过 new 实例化创建对象
var book = new Book(10, 'JavaScript设计模式', 50)
console.log(book.bookname)
```

this添加的属性和方法是实例对象自身拥有的，每次通过new创建实例的是后都会创建，但通过prototype添加的属性和方法在new创建实例对象的时候是不会重复创建的，需要访问prototype上的属性和方法就要沿着原型链一级一级的查找，prototype上的方法是共用的。

基本概念：
- 私有属性：构造函数内部创建的属性
- 私有方法：构造函数内部创建的方法
- 特权方法：通过this创建的方法，可以访问到类实例对象自身的私有属性和私有方法
- 对象公有属性：通过this创建的属性，在类创建对象时，每个对象自身都拥有一份并且可以在外部访问
- 对象公有方法：this上的方法
- 构造器：创建对象时调用的特权方法
- 类静态公有属性：对象不能访问
- 类静态公有方法：对象不能访问
- 公有属性：类的prototype上的属性
- 公有方法：类的prototype上的方法  

比如：
```javascript
var Book = function (id, name, price) {
  // 私有属性
  var num = 1
  // 私有方法
  function checkId() {}

  // 特权方法
  this.getName = function () {}
  this.getPrice = function () {}
  this.setName = function () {}
  this.setPrice = function () {}

  // 对象公有属性
  this.id = id
  this.copy = function () {}

  // 构造器
  this.setName(name)
  this.setPrice(price)
}

// 类静态公有属性 对象访问不到，要使用类+点语法访问
Book.isChinese = true
// 类静态公有方法 对象访问不到，要使用类+点语法访问
Book.resetTime = function () {}

Book.prototype = {
  isJsBook: false, // 公有属性
  display: function () {} // 公有方法
}
```

闭包实现：

```javascript
var Book = (function () {
  // 静态私有属性
  var bookNum = 0
  // 静态私有方法
  function checkBook(name) {}

  // 创建类
  function _book(newId, newName, newPrice) {
    // 私有变量
    var name, price

    // 私有方法
    function checkId(id) {}

    // 特权方法
    this.getName = function () {}
    this.getPrice = function () {}
    this.setName = function () {}
    this.setPrice = function () {}

    // 公有属性
    this.id = newId

    // 公有方法
    this.copy = function () {}
    bookNum++
    if (bookNum > 100) throw new Error('只出版100本书')
    
    // 构造器
    this.setName(newName)
    this.setPrice(newPrice)
  }

  // 构建原型
  _book.prototype = {
    // 静态公有属性
    isJsBook: true,
    // 静态公有方法
    display: function () {}
  }
  // 返回类
  return _book
})()
```
为什么要用闭包实现？闭包可以访问类函数作用域中的变量如bookNum。

创建对象的安全模式：防止创建实例对象的时候忘记new
```javascript
var Book = function (title, name, type) {
  if (this instanceof Book) { // 判断执行过程中this是否是当前对象，如果是就说明是用 new 创建的
    this.title = title
    this.name = name
    this.type = type
  } else { // 否则，重新创建这个对象
    return new Book(title, name, type)
  }
}
```

ES6下的封装

public：完全开放
protected：对子类开放
private：私有

```javascript
// typescript
class People {
  name  // public
  age   // public
  protected weight   // protected 属性
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
    this.weight = 120
  }

  eat() {
    return `${this.name} is eating egg`
  }
  speak() {
    return `My name is ${this.name}, I'm ${this.age} years old.`
  }
}

class Student extends People {
  number
  private girlfriend  // 私有属性
  constructor(name: string, age: number, number: number) {
    super(name, age)  // 继承
    this.number = number
    this.girlfriend = 'milly'
  }

  study() {
    return `${this.name} is learing coding`
  }
  getWeight() {  // 可以访问， protected属性可以被子类访问
    return this.weight 
  }
}

const xm = new Student('xiaoming', 10, 99)
xm.getWeight()
console.log(xm.girlfriend)  // 编译报错
```
TS在线工具：https://www.typescriptlang.org/play

封装：
  1. 减少耦合，不该外漏的不外漏
  2. 利于数据、接口的权限管理
  3. 一般认为_开头的属性时private属性

### 继承

> 子类继承父类

1. 类式继承
2. 构造函数继承
3. 组合继承
4. 原型式继承
5. 寄生式继承
6. 寄生组合式继承


ES6语法下的继承

```javascript
// 父类
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
}

// 子类
class Student extends Person {
  constructor(name, age, number) {
    super(name, age)   // 继承
    this.number = number
  }

  study() {
    return this.number
  }
}
```

继承可以将公共方法抽离出来，提高复用。


### 多态
> 同一接口不同实现，JS应用极少，需要接口JAVA等语言的接口、重写、重载等功能

1. 保持子类的开放性和灵活性
2. 面向接口编程
3. 了解即可

## jQuery如何使用面向对象

```javascript
class jQuery {
  constructor(selector) {
    const slice = Array.prototype.slice
    const dom = slice.call(document.querySelectorAll(selector))
    const len = dom ? dom.length : 0
    for(let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {
    // ...
  }

  addClass(name) {
    // ...
  }
  html(data) {
    // ...
  }
}

window.$ = function (selector) {
  return new jQuery(selector)
}
```

## 为什么要使用面向对象

程序执行：顺序、判断、循环 --- 结构化

面向对象 --- 数据结构化

对于计算机来说，结构化是最简单的

编程应用 简单 & 抽象
