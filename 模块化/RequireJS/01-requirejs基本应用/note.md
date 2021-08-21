## JS模块化的必要性

随着网站逐渐变成互联网应用程序（webApp），嵌入网页的JS代码越来越大，越来越复杂。网页越来越像桌面程序，需要一个团队分工协作/进度管理/单元测试等等...开发者不得不使用软件工程的方法管理网页的业务逻辑。JS模块化编程已经成为一个迫切的需求，理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人写好的模块。但是，JS不是一种模块化编程语言，它不支持“Class”，更不用谈论模块module了。（ES6支持了class的写法）

## JS模块化写法

- 模块：实现特定功能的一组方法
- 只要把不同的函数(以及记录状态的变量)简单的放在一起，就算是一个模块
### 原始写法 

```
function A() {
  // A中的逻辑
}
function B() {
  // B中的逻辑
}
```
上面的函数A和B，组成一个模块，使用的时候，直接调用即可。但是这种模块的缺点是：会污染全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

-  函数的分文件存放，需要哪个引入哪个即可，同样的，一旦封装的JS文件比较多，就需要在页面上引入大量的JS文件，所有JS文件中的所有函数都不能重名，一旦重名先引入的就会被后引入的函数覆盖导致程序崩溃


### 对象写法

```
var moduleA = {
  count: 100,
  sayHello: function () {
    console.log('hello all')
  },
  counter: function () {
    this.count += 10
    console.log(this.count)
  }
}

var moduleB = {
  count: 100,
  sayHello: function () {
    console.log('hello all')
  },
  counter: function () {
    this.count *= 10
    console.log(this.count)
  }
}


moduleA.sayHello()
moduleA.counter()

moduleB.sayHello()
moduleB.counter()
```

需要保证两个模块名称是不同的。这种方式存在的问题是，模块中的属性和方法对外都是暴露的，我可以直接通过`moduleA.count = 100`的方式修改模块中的count的值，这将会影响原来所有与count相关的操作。解决方法就是将模块中的所有属性和方法全部私有化。

### 立即执行函数（闭包）

- 使用立即执行函数IIFE可以达到不暴露私有成员的目的

```
var moduleA = (function () {
    var count = 10  // 私有变量

    function sayHello() {  // 私有函数
      console.log('hello all')
    }

    function counter() {
      count += 10
      console.log(count)
    }

    // 对外暴露
    return {
      hi: sayHello,
      num: counter
    }
  }
)()

在外面就访问不到内部的count了，同样的函数内部的函数也是直接访问不到的。
```

- 立即执行函数的方式实现模块化解决了上述的全局变量污染的问题，并且实现了私有化，但是它也存在问题，就是不可拓展。一个模块并不是开发完之后就只能拥有这些功能了，针对不同的业务场景，需要在这个模块的基础上进行二次开发，这个时候，使用闭包方式实现的模块化要想拓展功能就得去修改源码了，这...


### IIFE放大模式

```
var moduleA = (function () {
    var count = 10  // 私有变量

    function sayHello() {  // 私有函数
      console.log('hello all')
    }

    function counter() {
      count += 10
      console.log(count)
    }

    // 对外暴露
    return {
      hi: sayHello,
      num: counter
    }
  }
)()

moduleA = (function (mod) {
  function haha() {
    console.log("hello world")
  }

  mod.show = haha
  return mod
})(moduleA)
```

上述代码可以实现在引入的模块上扩展新的功能了，但是很明显，这样的操作对顺序是有要求的，我必须先将模块引入，才能执行在模块上拓展新功能的操作。

举个例子，在html中引入js，首先你引入了一个别人写好的模块moduleA.js，然后你在这个模块的基础上进行了功能拓展，代码在mymodule.js，这个时候的引入顺序是先moduleA.js再mymodule.js，但是js文件的加载是异步的，不能保证一定是先加载了moduleA.js再加载mymodule.js

### IIFE宽放大模式


- 解决加载顺序的问题

```
var moduleA = (function (mod) {
    var count = 10  // 私有变量

    function sayHello() {  // 私有函数
      console.log('hello all')
    }

    function counter() {
      count += 10
      console.log(count)
    }

    mod.hi = sayHello
    mod.num = counter

    // 对外暴露
    return mod
  }
)(moduleA || {})

var moduleA = (function (mod) {
  function haha() {
    console.log("hello world")
  }

  mod.show = haha
  return mod
})(moduleA || {})

moduleA.hi()
moduleA.num()
moduleA.show()
```

## 模块化开发规范

### commonJS规范

2009年，美国程序员Ryan Dahl创造了node.js项目，将JS语言用于服务端编程。这标志着JS模块化编程正式诞生。在浏览器环境下没有模块化其实问题不大，因为网页的程序复杂性有限，但是在服务端一定要有模块，与操作系统和其他应用程序互动，没有模块是无法编程的。node.js的模块系统就是参照commonJS规范实现的。在commonJS中，提供了全局性方法require用于加载模块

### AMD

### CMD

## 什么是RequireJS

- 一个JS加载器
- ES6出现之前，JS不像其他语言同样拥有“模块”的概念，出现了各种各样的语言工具，比如webpack、RequireJS
- 基于AMD规范, module transports, 是一个适用于浏览器环境的前端模块规范，实现文件异步加载。NodeJS遵循commonJS规范，适用于后端环境。

## 为什么使用RequireJS

- 模块化：就是将不同功能的函数封装起来，并提供使用接口，他们彼此之间互不影响
- 不会阻塞页面：RequireJS会在相关的js加载后执行回调函数，这个过程是异步非，所以不会阻塞页面
- 按需加载：平时写html文件的时候，在底部可能会引用一堆JS文件，在页面加载的时候，这些js也会全部加载。比如，写了一个点击事件，放到了一个js文件里，并在HTML引用，在不使用requireJS的情况下，页面加载它就跟着加载，如果使用了requireJS，什么时候触发某个事件什么时候才会加载

## 如何使用

引入之后会向全局暴露三个变量：

- require
- requirejs

上面两个函数功能是一样的，共有4个参数：
  - deps：依赖集合
  - callback：回调
  - errback：失败的回调
  - optional：配置

- define：用来定义模块
  - name：模块名称
  - deps：模块的依赖集合
  - callback：回调

一个js文件就是一个模块文件。

### require/define

```
require(['./www/js/app/sub.js', './www/js/app/b.js'], function (sub, b) {
  // ...
})

require(['./www/js/app/sub', './www/js/app/b '], function (sub, b) {
  // ...
})
```

- 第一个参数是一个数组，里面是一个个的依赖模块
- 第二个参数是一个回调函数，回调中的参数对应于前面依赖集合中对应模块暴露的数据
- 对js文件比较敏感，加载模块时可以省略.js后缀，但是其他类型的文件后缀不可以省略
- 通过require/requirejs加载模块
- 通过define定义模块

