
- [JS数组](#js数组)
  - [声明、创建与初始化数组](#声明创建与初始化数组)
  - [添加元素](#添加元素)
  - [删除元素](#删除元素)
  - [数组API](#数组api)
  - [ES6中的数组新方法](#es6中的数组新方法)

## JS数组

功能：存储一组有序数据，可以是不同类型的

### 声明、创建与初始化数组
1. 构造函数方式

```javascript
var arr1 = new Array()  // 创建一个空数组，也可以理解为长度为0的数组，该数组元素的值为undefined
var arr2 = new Array(5)  // 创建一个长度为5的数组，该数组中元素的值都是undefined
var arr3 = new Array(1, 2, 3, 4, 5)  // 创建一个数组，并且初始化这个数组，即[1,2,3,4,5] 
```

2. 字面量方式

```javascript
var arr1 = [] // 创建一个空数组
var arr2 = [1, 2, 3]  // 创建一个数组，并初始化为[1，2，3]
```

创建一个数组，上面两种方式都可以，但是字面量的方式比构造函数的方式更高效一些，原因是

### 添加元素

### 删除元素

### 数组API

### ES6中的数组新方法

1. `Array.from(arrayLike, [, mapFn[, thisArg]])`
   - 使用：从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
   - 参数：
     - arrayLike：想要转换成数组的伪数组对象或可迭代对象。
     - mapFn：如果指定了该参数，新数组中的每个元素会执行该回调函数。
     - thisArg：可选参数，执行回调函数 mapFn 时 this 对象
   - 返回值：一个新的数组实例。
   - from() 的 length 属性为 1 ，即 `Array.from.length === 1`
   - 应用举例：
     - 从String生成数组：
      ```javascript
      Array.from('foo')   // [ "f", "o", "o" ] 
      ```
     - 从Set生成数组：
      ```javascript
      const set = new Set(['foo', 'bar', 'baz', 'foo'])
      Array.from(set)   // [ "foo", "bar", "baz" ]
      ```
     - 从Map生成数组：
      ```javascript
      const map = new Map([[1, 2], [2, 4], [4, 8]])
      Array.from(map)  // [[1, 2], [2, 4], [4, 8]]

      const mapper = new Map([['1', 'a'], ['2', 'b']])
      Array.from(mapper.values())  // ['a', 'b']
      Array.from(mapper.keys())  // ['1', '2']
      ```
     - 从arguments(伪数组、类数组对象)生成数组
      ```javascript
      function f() {
        return Array.from(arguments);
      }
      console.log(f(1, 2, 3))  // [1, 2, 3]
      ```
     - 在`Array.from`中使用箭头函数
      ```javascript
      Array.from([1, 2, 3], x => x + x)   // [2, 4, 6]
      Array.from({length: 5}, (v, i) => i)  // [0, 1, 2, 3, 4]
      ```
     - 数组去重合并
      ```javascript
      function combine(){ 
          let arr = [].concat.apply([], arguments)  //没有去重复的新数组 
          return Array.from(new Set(arr))
      } 

      var m = [1, 2, 2], n = [2,3,3]
      console.log(combine(m,n))   // [1, 2, 3]
      ```





