
- [JS数组](#js数组)
  - [声明、创建与初始化数组](#声明创建与初始化数组)
  - [push() + pop()实现栈](#push--pop实现栈)
  - [shift() + push()实现队列](#shift--push实现队列)
  - [实现数组重排序方法](#实现数组重排序方法)
  - [ES6中的数组新方法](#es6中的数组新方法)
- [JS数组常用方法总结：](#js数组常用方法总结)
  - [JS能够改变原数组的方法](#js能够改变原数组的方法)
  - [JS不会改变原数组的方法](#js不会改变原数组的方法)

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

创建一个数组，上面两种方式都可以，但是字面量的方式比构造函数的方式更高效一些。

### push() + pop()实现栈

- 栈：先入后出，后入先出，出栈和入栈的操作都是在栈顶操作的。

- `push()`: 可以接收任意数量的参数，把它们逐个添加到数组的末尾，返回值为修改后数组的长度
  ```javascript
  var arr = new Array()  // 创建一个空数组
  var count = arr.push(1, 2, 3)
  console.log(arr)  // [1, 2, 3]
  console.log(count)  // 3
  ```
- `pop()`： 从数组末尾移除最后一项，减少数组的length值，返回值是移除的项
  ```javascript
  var nail = arr.pop()
  console.log(nail)  // 3
  console.log(arr)  // [1, 2]
  ```

### shift() + push()实现队列

- 队列：先进先出
- `shift()`: 移除数组第一项，返回值为移除的那个数组元素，同时数组长度减1
  ```javascript
  var arr = [1, 2, 3, 4]
  var first = arr.shift()
  console.log(first)  // 1
  console.log(arr)  // [2, 3, 4]
  ```

此外，还提供了`unshift()`方法，该方法能够在数组前端添加任意个项并返回新数组的长度。所以，使用pop()和unshift()方法从相反的方向模拟队列。
  ```javascript
  var arr = ['a', 'b', 'c']
  var count = arr.unshift("r", "s")
  console.log(count)  // 5
  console.log(arr)  // ["r", "s", "a", "b", "c"]
  ```

### 实现数组重排序方法

- reverse(): 反转数组
  ```javascript
  var arr = [1, 2, 3, 4]
  var b = arr.reverse()
  console.log(arr)
  console.log(b)  // [4, 3, 2, 1]
  console.log(arr == b)  // true
  ```
- sort(): 

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
2. `Array.isArray(obj)`：
   - 作用：判断传入的是不是一个数组类型
   - 返回值：true/false
3. `Array.of(element0[, element1[, ...[, elementN]]])`：
   - 作用：将一组值转换成一个数组，总是返回参数值组成的数组
   - 如何使用：
      ```javascript
      Array.of()  // []
      Array.of(3)  // [1]
      Array.of(1, 2, 3)  // [1, 2, 3]
      Array.of(undefined)   // [undefined]
      ```
   - 与Array创建数组的区别：
     ```javascript
     // Array本身如果传入的个数不同，会导致数组的行为有差异
     Array()  // []
     Array(3)  // [,,,]    [empty × 3]
     Array(1, 2, 3)  // [1, 2, 3]
     Array(undefined)   // [undefined]
     ```
4. `copyWithin(target[, start[, end]])`
   - 作用：浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度
   - 参数含义：
     - target：0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，将会不发生拷贝。
     - start：0 为基底的索引，开始复制元素的起始位置
     - end：0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。
   - 返回值：改变后的数组
   - 使用:
    ```javascript
    var arr = [1, 2, 3, 4, 5]
    console.log(arr.copyWithin(0, 3))  // [4, 5, 3, 4, 5]，从index=3的位置开始截取数组元素得到的时4,5，然后将这两个元素放在从0开始的位置
    console.log(arr)  // [4, 5, 3, 4, 5] 改变原数组
    console.log(arr.copyWithin(0, 2, 3))  // [3, 5, 3, 4, 5]
    ```


## JS数组常用方法总结：
- `arr.push()`、`arr.pop()`、`arr.shift()`、`arr.unshift()`: 数组的元素增删操作
- `arr.fill(value[, start[, end]])`：从start到end位置(不包括end)填充数值value
- `arr.copyWithin()`：
- `arr.reverse()`、`arr.sort()`: 修改数组元素顺序，直接在原数组上修改
- `arr.splice(1, 1)`：从索引值为1的位置开始，删除1个元素，直接在原数组上修改
- `arr.splice(1, 0, 'a', 'b')`: 从索引为1的位置开始插入a和b两个元素
- `arr.splice(1, 2, 3, 4)`: 从索引为1的位置开始，删除2个元素，插入两个元素，相当于替换
- `arr.slice(1, 2)` ：截取数组的一部分，前闭后开，返回一个新数组，原数组不变
- `arr.includes(value)`:判断一个数组是否包含一个指定的值，如果是返回 true，否则false，有NaN的话也可以正常判断
- `arr.join("")`：实现数组元素无缝拼接成字符串，默认以逗号为连接符进行拼接
- `arr.toString()`: 数组中元素转换成字符串功能类似与join方法
- `arr.flat()`: 扁平化嵌套数组，数组降维 ，返回新数组, 该方法会移除数组中的空项
- `arr.flat(Infinity)`: 使用 Infinity，可展开任意深度的嵌套数组
- `arr.entries()`：将数组返回一个对象，包含对象索引的键值对
- `arr.indexOf(item, index)`: 从index开始查找item元素在数组arr中的第一个索引位置，如果没有返回-1
- `arr.every(callback)`：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true
- `arr.some(callback)`：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true
- `arr.forEach(callback, thisArg)`：对数组进行遍历循环，不可以使用item直接改变原数组，可以通过`arr[index]`修改原数组
- `arr.filter(callback)`：数组中每一项都运行给定的callback，返回值是所有满足条件的元素组成的数组
- `arr.map(callback)`: 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
- `arr.reduce((total, currentValue, currentIndex, arr) => {}, initValue)`: 接受一个函数作为累加器，数组中每个值从左到右开始缩减，最终计算为一个值。
- `arr.lastIndexOf`: 与`arr.indexOf(item, index)`功能相似，查找方向相反
- `arr.findIndex(callback)`：返回数组中满足callback的第一个元素的索引值，如果没有返回-1
- `arr.find(callback)`：返回数组中满足callback的第一个元素的值，没有返回`undefined`


### JS能够改变原数组的方法

> arr.push()

> arr.pop()

> arr.shift()

> arr.unshift()

> arr.reverse()

> arr.sort()

> arr.splice()

> arr.fill()

> arr.copyWithin()

### JS不会改变原数组的方法

> arr.slice()

> arr.map()

> arr.forEach()

> arr.every()

> arr.some()

> arr.filter()

> arr.reduce()

> arr.entries()

> arr.find()

> arr.concat()
