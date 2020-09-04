<h1>CSS 知识点总结</h1>

---

- [介绍一下CSS的盒子模型](#介绍一下css的盒子模型)
- [CSS选择器有哪些](#css选择器有哪些)
- [伪类与伪元素的区别](#伪类与伪元素的区别)
- [CSS优先级如何计算](#css优先级如何计算)
- [CSS中的继承](#css中的继承)
- [如何实现水平居中？如何实现垂直居中？](#如何实现水平居中如何实现垂直居中)
- [BFC是什么](#bfc是什么)
- [清除浮动的方法](#清除浮动的方法)
- [CSS性能优化](#css性能优化)
- [浏览器如何解析CSS选择器](#浏览器如何解析css选择器)

---

### 介绍一下CSS的盒子模型

- 盒模型的4个组成部分：
  - margin 外边距
  - border 边界
  - padding 内边距
  - content 内容
- 两种盒模型：
  - (默认)IE盒模型(`box-sizing: content-box;`): 属性width和hight包含border+padding，即width(height)=padding+content+border, 当更改width大小时，整个盒子也会跟着变化
  - W3C盒模型(`box-sizing: border-box;`): 属性width和height只包含content
- 在编写页面代码时应尽量使用标准的W3C模型(需在页面中声明DOCTYPE类型)，这样可以避免多个浏览器对同一页面的不兼容。
因为若不声明DOCTYPE类型，IE浏览器会将盒子模型解释为IE盒子模型，FireFox等会将其解释为W3C盒子模型；若在页面中声明了DOCTYPE类型，所有的浏览器都会把盒模型解释为W3C盒模型。

### CSS选择器有哪些

### 伪类与伪元素的区别

### CSS优先级如何计算

### CSS中的继承

### 如何实现水平居中？如何实现垂直居中？

### BFC是什么

### 清除浮动的方法

### CSS性能优化

### 浏览器如何解析CSS选择器