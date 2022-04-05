
## ts优势

1. ts的静态类型可以使得在开发过程中就发现潜在的问题(类型提示等)
2. ts有更友好的编辑器自动提示
3. ts代码语义更清晰，不需要深入到具体的业务代码就可以清楚看到具体逻辑

## ts运行环境

全局安装typescript: npm i typescript -g

执行ts文件：
tsc index.ts  
node index.js

简化：
全局安装ts-node: npm i ts-node -g

执行ts文件：ts-node index.ts

## 静态类型

```javascript
const count: number = 123

count类型确定
count会具备确定的属性和方法
```

基础类型：boolean, number, string, void, undefined, symbol, null

对象类型：{}, class, function, []
```javascript
// 返回值类型可以不写，ts可以推断出来
const func = (str: number): number => {
  return parseInt(str, 10)
}

// 需要指定返回值类型 
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10)
}
```

```javascript
// temp 可以是 number 或者 string 类型
let temp: number | string = 123

temp = '2342'
```

## 类型注解 与 类型推断

type annotation: 主动告诉ts变量是什么类型

```javascript
let count: number
```

type inference: ts会自动尝试分析变量的类型
```javascript
const aaa = 123
```
鼠标放上去就显示推断的类型。

如果TS能够自动分析变量类型，就什么也不需要做了，如果TS无法分析变量类型的话，就需要使用类型注解。

TS就是想让所有的变量都有自己的类型。


## 函数相关类型

定义函数：
```javascript
const func1 = function () {}

func2() {}

const func3 = () => {}
```

```javascript
// 指定返回值类型，避免实际返回值类型与预期不符
function add(first: number, second: number): number {
  return first + second
}

// 没有 return， 没有返回值
function seyHello(): void {
  console.log('hello')
}

// 函数 不可能执行到最后
function errorEmitter(): never {
  throw new Error()
  console.log('assd')
}

// 函数参数接收 解构 的内容
function add2(
  { first, second }: {first: number, second: number}
):number {
  return first + second
}
```

## 数组 和 元组










