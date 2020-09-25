- [this的5种情况](#this的5种情况)
  - [事件绑定](#事件绑定)
  - [普通函数执行](#普通函数执行)
  - [构造函数执行](#构造函数执行)
  - [箭头函数](#箭头函数)
  - [call/apply/bind改变this指向](#callapplybind改变this指向)

## this的5种情况

> - 事件绑定
> - 普通函数执行
> - 构造函数执行
> - 箭头函数
> - call/apply/bind


### 事件绑定

> 给元素的某个事件行为绑定方法，事件触发，方法执行，此时方法中的this一般都是当前元素本身

```html
<button id="btn">点击按钮</button>
```

```javascript
//=>DOM0
btn.onclick = function anonymous() {
	console.log(this)   //=>元素
}

// 等价写法：
function anonymous() {
    console.log(this)
}
btn.onclick = anonymous


// 注意：
function anonymous() {
    console.log(this)
}
btn.onclick = function () {
    console.log(this)   // 元素本身
    anonymous()   // 这个函数里面的this指的是window
}
```

```javascript
// DOM2
btn.addEventListener('click', function anonymous() {
	console.log(this)   //=> 元素
}, false)

btn.attachEvent('onclick', function anonymous(){
	// <= IE8浏览器中的DOM2事件绑定
	console.log(this)   //=>window
})
```

### 普通函数执行

> 普通函数执行，它里面的THIS是谁，取决于方法执行前面是否有“点”，有的话，“点”前面是谁THIS就是谁，没有THIS指向WINDOW(严格模式下是UNDEFINED)

```javascript
function fn() {
    console.log(this)
}

let obj = {
    name: 'xiaoxiao',
    fn: fn
}

fn()
obj.fn()
console.log(obj.hasOwnProperty('name'))  //=>hasOwnProperty方法中的this:obj  TRUE
console.log(obj.__proto__.hasOwnProperty('name'))  //=>hasOwnProperty方法中的this:obj.__proto__(Object.prototype)  FALSE
console.log(Object.prototype.hasOwnProperty.call(obj, 'name'))  //<=> obj.hasOwnProperty('name')
```
- `hasOwnProperty`: 用来检测某个属性名是否属于当前对象的私有属性
- `in`：用来检测是否为其属性(不论私有还是公有)
  - `console.log(obj.hasOwnProperty('name'))   //=>true`
  - `console.log(obj.hasOwnProperty('toString'))    //=>false`
  - `console.log('toString' in obj)    //=>true`

### 构造函数执行

> 构造函数执行（new xxx），函数中的this是当前类的实例

```javascript
function Fn() {
    console.log(this)
    //=> this.xxx=xxx   是给当前实例设置私有属性
}
let f = new Fn
```

### 箭头函数

> 箭头函数中没有自身的THIS，所用到的THIS都是其上下文中的THIS
> 箭头函数没有的东西很多：
> - 没有prototype（也就是没有构造器），所以不能被new执行
> - 没有arguments实参集合（可以基于...args剩余运算符获取）

```javascript
let obj = {
    fn: (...args) => {
        // this: window
        console.log(this)
    }
}

obj.fn() 
new obj.fn()  // 报错， obj.fn is not a constructor
```

使用匿名函数的情况：
```javascript
let obj = {
    name: 'OBJ',
    fn: function () {
        // console.log(this)  //=> obj
        return function () {
            // console.log(this)  //=> window
            this.name = "李易峰"
        }
    }
}

let ff = obj.fn()
ff()
```

如果想让fn返回的那个函数中的this也指向obj有两种方法：
```javascript
let obj = {
    name: 'OBJ',
    fn: function () {
        // console.log(this)  //=> obj
        let _this = this
        return function () {
            // console.log(this)  //=> window
            // console.log(_this)  // => obj
            _this.name = "李易峰"
        }
    }
}

let ff = obj.fn()
ff()

// 或者可以直接使用箭头函数
let obj = {
    name: 'OBJ',
    fn: function () {
        // console.log(this); //=>obj
        return () => {
            console.log(this); //=>obj
        }
    }
}

let ff = obj.fn()
ff()
```

尤其要注意使用定时器时的this：
```javascript
let obj = {
    name: 'OBJ',
    fn: function () {
        setTimeout(function () {
            console.log(this)  // window
            this.name = 'xiaoxiao'
        }, 1000)
    }
}

let ff = obj.fn()
ff()
```

如果想要实现1s之后改变obj中的name，同样可以使用箭头函数：
```javascript
let obj = {
    name: 'OBJ',
    fn: function () {
        setTimeout(_ => {
            console.log(this)  // obj
            this.name = 'xiaoxiao'
        }, 1000)
    }
}

let ff = obj.fn()
ff()
```

### call/apply/bind改变this指向

> 基于call/apply/bind可以改变函数中this的指向(强行改变)
> 
> call/apply
>   - 第一个参数就是改变的THIS指向，写谁就是谁（特殊：非严格模式下，传递null/undefined指向的也是window，第一个参数不传的话this也是window）
>   - 唯一区别：执行函数，传递的参数方式有区别，call是一个个的传递，apply是把需要传递的参数放到数组中整体传递
>   - func.call([context],10,20) 
>   - func.apply([context],[10,20])
> 
> bind
>   - call/apply都是改变this的同时直接把函数执行了，而bind不是立即执行函数，属于预先改变this和传递一些内容  =>"柯理化"

```javascript
Function.prototype={
    call
    apply
    bind
}

// 这是Function原型上的方法，所有的函数都可以调用这三个方法
```

```javascript
let obj = {
	fn(x, y) {
        console.log(this, x, y)
	}
}

obj.fn.call({}, 10, 20)
obj.fn.apply(window, [10, 20])

setTimeout(obj.fn.bind(window, 10, 20), 1000)
```


- 重写bind函数
```javascript
~ function anonymous(proto) {
    function myBind(ctx) {
        if(ctx == undefined) {
            // ctx may be null or undefined
            ctx = window
        }

        var outerArgs = [].slice.call(arguments, 1)
        // this： 需要最终执行的函数
        var _this = this
        return function () {
            var innerArgs = [].slice.call(arguments, 0)
            this.apply(ctx, outerArgs.concat(innerArgs))
        }
    }

    proto.myBind = myBind
}(Function.prototype)



// ES6版本
~ function anonymous(proto) {
    function myBind(ctx = window, ...outerArgs) {
        return (...innerArgs) => this.call(ctx, ...outerArgs.concat(innerArgs))
    }

    proto.myBind = myBind
}(Function.prototype)

// 注意：经过测试call的性能要比apply性能好

setTimeout(obj.fn.bind(window, 10, 20), 1000)
// setTimeout(anonymous, 1000)       1S后先执行bind的返回结果anonymous，在anonymous中再把需要执行的obj.fn执行，把之前存储的context/args传给函数

document.body.onclick = obj.fn.bind(window, 10, 20)
// document.body.onclick = anonymous
```
- 重写call函数
```javascript
// 这种写法必须保证ctx是引用类型
~ function anonymous(proto) {
    function myCall(ctx = window, ...args) {
        // 将ctx看作是一个obj，给obj添加一个方法，这个方法在调用的时候里面的this指向的就是ctx
        ctx.$fn = this
        let result = ctx.$fn(...args)
        delete ctx.$fn
        return result
    }

    proto.myCall = myCall
}(Function.prototype)


// 手写call详细版本
~ function anonymous(proto) {
    function myCall(ctx = window, ...args) {
        ctx === null ? ctx = window : null
        let type = typeof ctx
        if (type !== 'object' &&  type !== 'function' && type !== 'symbol') {
            // 走了这个分支，说明是基本类型值
            switch(type) {
                case 'number': 
                    ctx = new Number(ctx)
                    break
                case 'string':
                    ctx = new String(ctx)
                    break
                case 'boolean':
                    ctx = new Boolean(ctx)
                    break
            }
        }

        ctx.$fn = this
        let result = ctx.$fn(...args)
        delete ctx.$fn
        return result
    }

    proto.myCall = myCall
}(Function.prototype)
```

- 重写apply函数

```javascript
~ function anonymous(proto) {
    function myApply(ctx = window, args) {
        ctx.$fn = this
        let result = ctx.$fn(...args)
        delete ctx.$fn
        return result
    }

    proto.myApply = myApply
}(Function.prototype)
```

- 练习
```javascript
/* function call(context = window, ...args) {
    context.$fn = this;
    let result = context.$fn(...args);
    delete context.$fn;
    return result;
} => AAAFFF000*/


function fn1(){ console.log(1) }
function fn2(){ console.log(2) }

fn1.call(fn2)
/*
* call执行
*   this=>fn1
*   context=>fn2
*   args=>[]
* fn2.$fn = fn1;  fn2.$fn(...[])
*/

fn1.call.call(fn2)
/*
* 先让最后一个CALL执行
*   this=>fn1.call=>AAAFFF000
*   context=>fn2
*   args=>[]
* fn2.$fn=AAAFFF000  fn2.$fn(...[])
*
* 让CALL方法再执行
*    this=>fn2
*    context=>undefined
*    args=>[]
* undefined.$fn=fn2  undefined.$fn()
* 
* 让fn2执行
*/

Function.prototype.call(fn1)
/*
* 先让最后一个CALL执行
*     this=>Function.prototype(anonymous函数)
*     context=>fn1
*     args=>[]
* fn1.$fn=Function.prototype   fn1.$fn()
* 让Function.prototype执行
*/

// 注意：其他任何类的原型都是对象，只有Function的原型是一个匿名函数

Function.prototype.call.call(fn1)
/*
* 先让最后一个CALL执行
*     this=>Function.prototype.call（AAAFFF000）
*     context=>fn1
*     args=>[]
* fn1.$fn=AAAFFF000   fn1.$fn()
* 
* 让CALL执行
*    this=>fn1
*    context=>undefined
*    args=>[]
* undefined.$fn=fn1   undefined.$fn()
* 让fn1执行
*/
```

参考：[js 五种绑定彻底弄懂this，默认绑定、隐式绑定、显式绑定、new绑定、箭头函数绑定详解](https://www.cnblogs.com/echolun/p/11962610.html)

