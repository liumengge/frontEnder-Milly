// // 声明父类
// function SuperClass(name) {
//   // 值类型共有属性
//   this.name = name
//   // 引用类型共有属性
//   this.books = ['js', 'html', 'css']
// }
// // 父类原型公有方法
// SuperClass.prototype.getName = function () {
//   console.log(this.name)
// }

// // 声明子类
// function SubClass(name, id) {
//   // 构造函数式继承父类的 name 属性
//   SuperClass.call(this, name)
//   // 子类共有属性
//   this.bookId = id
// }

// // 类式继承
// SubClass.prototype = new SuperClass()

// SubClass.prototype.getBookId = function () {
//   console.log(this.bookId)
// }

// // 测试
// var instance1 = new SubClass('js', 10)
// var instance2 = new SubClass('css', 5)

// instance1.books.push('html')
// console.log(instance1.books)
// console.log(instance2.books)


// function inheritObj(o) {
//   // 声明一个过渡函数对象
//   function F() {}
//   // 过渡对象的原型继承父对象
//   F.prototype = o
//   // 返回过渡对象的一个实例。该实例的原型继承了父对象
//   return new F()
// }

// var book = {
//   name: 'I like it',
//   books: ['js book', 'css book']
// }

// var book1 = new inheritObj(book)
// var book2 = new inheritObj(book)

// book1.name = 'I dislike it'
// book1.books.push('html book')

// console.log(book1.name)
// console.log(book1.books)
// console.log(book2.name)
// console.log(book2.books)







// 寄生组合式继承
// 原型式继承
function inheritObj(o) {
  // 声明一个过渡函数对象
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = o
  // 返回过渡对象的一个实例。该实例的原型继承了父对象
  return new F()
}

/**
 * 寄生式继承 继承原型
 * @param subClass 子类
 * @param superClass 父类
 */
function inheritPrototype(subClass, superClass) {
  // 复制父类的原型副本
  var p = inheritObj(superClass.prototype)
  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  p.constructor = subClass
  // 设置子类的原型
  subClass.prototype = p
}

// 父类
function SuperClass(name) {
  this.name = name
  this.colors = ['red', 'blue']
}
SuperClass.prototype.getName = function () {
  console.log(this.name)
}

// 子类
function SubClass(name, time) {
  // 构造函数式继承
  SuperClass.call(this, name)
  // 子类的属性
  this.time = time
}

// 寄生式继承父类原型
inheritPrototype(SubClass, SuperClass)

// 子类新增原型方法
SubClass.prototype.getTime = function () {
  console.log(this.time)
}

var instance1 = new SubClass('js', 2014)
var instance2 = new SubClass('css', 2013)
instance1.colors.push('green')

console.log(instance1.colors)
console.log(instance2.colors)
instance2.getName()
instance2.getTime()