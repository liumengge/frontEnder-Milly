// 装饰器

// 装饰器是一项实验性特性，若要开启，需要再命令行或者tsconfig.json中启用 experimentalDecorators编译器

// 命令行： tsc --target ES5 --experimentalDecorators

// tsconfig

// {
//   "compilerOptions": {
//       "target": "ES5",
//       "experimentalDecorators": true
//   }
// }

// 什么是 装饰器 ？

// 一种特殊类型的声明，可以被附加到 类声明、方法、访问符、属性或参数上
// @expression : expression 求值后必须是一个函数，在运行时被调用，被装饰的声明信息作为参数传入

// 装饰器工厂函数：一个函数，返回一个表达式，这个表达式是一个函数，这个函数叫装饰器，这个装饰器在运行时被调用  闭包？

function color(value: string) {
  return function (target) {
    console.log(value, target)
  }
}


function f() {
  console.log("f(): evaluated")
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("f(): called")
  }
}

function g() {
  console.log("g(): evaluated")
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("g(): called")
  }
}

// class C {
//   @f()
//   @g()
//   method() {}
// }


// 装饰器求值

// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
// 参数装饰器应用到构造函数。
// 类装饰器应用到类

// 类装饰器

@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return `Hello, ${this.greeting}`
  }
}

// 定义sealed装饰器
function sealed(constructor: Function) {
  // Object.seal() 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

// 方法装饰器

// 访问器装饰器

// 属性装饰器

// 参数装饰器

// 元数据

