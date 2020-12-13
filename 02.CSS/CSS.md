<h1>CSS 知识点总结</h1>

---

- [介绍一下CSS的盒子模型](#介绍一下css的盒子模型)
- [CSS选择器有哪些](#css选择器有哪些)
- [伪类与伪元素的区别](#伪类与伪元素的区别)
- [CSS优先级如何计算](#css优先级如何计算)
- [CSS中的继承](#css中的继承)
- [CSS定位](#css定位)
- [sticky定位案例](#sticky定位案例)
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

### CSS定位
- position属性的作用：指定一个元素在网页上的位置，共有5种方式
  - `static`：默认值，如果省略position属性，浏览器就认为该元素是static定位。浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"（`normal flow`）。每个块级元素占据自己的区块（block），元素与元素之间不产生重叠，这个位置就是元素的默认位置。static定位所导致的元素位置，是浏览器自主决定的，所以这时`top、bottom、left、right`这四个属性无效。
  - `relative`：相对于默认位置（即static时的位置）进行偏移，即定位基点是元素的默认位置。必须搭配`top、bottom、left、right`这四个属性一起使用，用来指定偏移的方向和距离。
  - `fixed`：相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。它如果搭配top、bottom、left、right这四个属性一起使用，表示元素的初始位置是基于视口计算的，否则初始位置就是元素的默认位置。
  - `absolute`：相对于上级元素（一般是父元素）进行偏移，即定位基点是父元素。定位基点（一般是父元素）不能是`static`定位，否则定位基点就会变成整个网页的根元素html。另外，`absolute`定位也必须搭配`top、bottom、left、right`这四个属性一起使用。`absolute`定位的元素会被"正常页面流"忽略，即在"正常页面流"中，该元素所占空间为零，周边元素不受影响。
  - `sticky`(sticky是2017年浏览器才支持)：会产生动态效果，很像`relative`和`fixed`的结合,一些时候是relative定位（定位基点是自身默认位置），另一些时候自动变成fixed定位（定位基点是视口）。

### sticky定位案例
- 网页导航栏：初始加载时在自己的默认位置(relative定位)，页面向下滚动时，导航栏变成固定为位置，始终停留在页面头部(fixed定位)，页面重新向上滚动到原位置时，导航栏回到默认位置(`02.CSS/sticky定位/case1.html and case4.html`)
- 堆叠效果：页面滚动时，下方的元素覆盖上方的元素(`02.CSS/sticky定位/case3.html`)
- 表格固定表头

- 小结：sticky定位规则
  - 必须指定`top、bottom、left、right`4个值之一，否则只会处于相对定位
  - 父级元素不能有任何`overflow:visible;`以外的overflow设置，否则没有粘滞效果
  - 父级元素设置和粘性定位元素等高的固定的height高度值，或者高度计算值和粘性定位元素高度一样，没有粘滞效果
  - 同一个父容器中的`sticky`元素，如果定位值相等，则会重叠
  - 如果属于不同父元素，且这些父元素正好紧密相连，则会挤开原来的元素，形成依次占位的效果
  - `sticky`定位的top值是基于滚动容器的距离

参考：[深入理解position:sticky;](https://www.zhangxinxu.com/wordpress/2020/03/position-sticky-rules/)

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
