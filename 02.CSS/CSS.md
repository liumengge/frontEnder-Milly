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
- [CSS三列布局](#css三列布局)
  - [两边固定，中间自适应](#两边固定中间自适应)
  - [中间固定，两边自适应](#中间固定两边自适应)
- [CSS两列布局 - 左边固定，右边自适应](#css两列布局---左边固定右边自适应)

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

### CSS三列布局



#### 两边固定，中间自适应
  
1. 使用position实现

- 思路：center居中，利用margin为左右两边留出位置，左右使用绝对定位

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>position实现三列布局</title>
    <style>
        .box {
            width: 100%;
            height: 100%;
        }
        .left {
            position: absolute;
            top: 0;
            left: 0;
            width: 200px;
            height: 200px;
            background-color: red;
        }
        .center {
            margin: 0 200px;
            background-color: chartreuse;
        }
        .right {
            position: absolute;
            top: 0;
            right: 0;
            width: 200px;
            height: 400px;
            background-color: blueviolet;
        }
    </style>
</head>
<body>
    <div class="box">
        <div class="left">left</div>
        <div class="center">center</div>
        <div class="right">right</div>
    </div>
</body>
</html>
```
- 这种方式，在改变窗口大小的时候，右边的盒子会盖住左边的盒子

2. 使用float实现

- 左右元素浮动，注意：中间元素必须置于二者之后

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>float实现三列布局</title>
    <style>
        .left, .right {
            width: 200px;
            height: 200px;
            background-color: chocolate;
        }
        .left {
            float: left;
        }
        .right {
            float: right;
        }
        .center {
            margin: 0 auto;
            height: 200px;
            background-color: darkgoldenrod;
            overflow: hidden;
        }
        .dd {
            width: 50px;
            height: 50px;
            background-color: darkgreen;
        }
    </style>
</head>
<body>
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="center">
        <p>asdasdasdasdasfsadfdf</p>
        <div class="dd"></div>
    </div>

</body>
</html>
```

3. 使用flex实现

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>flex实现三列布局</title>
    <style>
        .box {
          width: 100%;
          height: 100px;
          display: flex;
          margin: 10px;
        }
        .left, .right {
          width: 200px;
          height: 100px;
          margin: 10px;
          background-color: #999;
        }
        .center {
          flex: 1;
          height: 100px;
          margin: 10px;  /*左右margin不会叠加*/
          background-color: #f00;
        }
    </style>
</head>
<body>
    <div class="box">
        <div class="left">left</div>
        <div class="center">center</div>
        <div class="right">right</div>
    </div>
</body>
</html>
```

#### 中间固定，两边自适应

```html

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			* {
				margin: 0;
				padding: 0;
			}
			.box {
				display: flex;
			}
			.center {
				width: 800px;
				text-align: center;
				background: #ccc;
			}
			.left,.right {
				/*flex-grow 属性用于设置或检索弹性盒的扩展比率。*/
        flex-grow: 1;
        line-height: 30px;
        background: red;
      }
		</style>
	</head>
	<body>
		<div class="box">
			<div class="left">left</div>
			<div class="center">center</div>
			<div class="right">right</div>
		</div>
	</body>
</html>
```

### CSS两列布局 - 左边固定，右边自适应
