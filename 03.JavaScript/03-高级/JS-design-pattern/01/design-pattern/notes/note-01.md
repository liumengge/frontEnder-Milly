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

### 继承
> 子类继承父类

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

### 封装
> 数据的权限和保密

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



