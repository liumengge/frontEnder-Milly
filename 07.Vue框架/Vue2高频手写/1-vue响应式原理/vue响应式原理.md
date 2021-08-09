- [一、使用Rollup搭建开发环境](#一使用rollup搭建开发环境)
  - [1.什么是Rollup?](#1什么是rollup)
  - [2.环境搭建](#2环境搭建)
- [二.Vue响应式原理](#二vue响应式原理)
  - [1.初始化数据](#1初始化数据)
  - [2.递归属性劫持](#2递归属性劫持)
  - [3.数组方法的劫持](#3数组方法的劫持)

##  一、使用Rollup搭建开发环境

### 1.什么是Rollup?

 *Rollup* 是一个 JavaScript 模块打包器, 可以将小块代码编译成大块复杂的代码， rollup.js更专注于Javascript类库打包 (开发应用时使用Webpack，开发库时使用Rollup)

### 2.环境搭建

**安装rollup环境**

```bash
# rollup  
# rollup-plugin-babel  rollup和babel的桥梁     
# @babel/core  babel的核心模块
# @babel/preset-env   ES6转ES5
# rollup-plugin-serve   启动本地服务
npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve cross-env -D
```

**rollup.config.js文件编写**

```js
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
export default {
    input: './src/index.js',
    output: {
        format: 'umd', // 模块化类型
        file: 'dist/umd/vue.js', 
        name: 'Vue', // 打包后的全局变量的名字
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        process.env.ENV === 'development'?serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000,
            contentBase: ''
        }):null
    ]
}
```

**配置.babelrc文件**

使用babel的时候，需要使用@babel/preset-env来进行转换，所以需要配置presets，可以在上述打包配置文件中的babel插件中配置，也可以单独配置一个babel文件。
```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```
presets是预设，可以认为是一个插件的集合，比如说要将ES6转成ES5，可能需要把箭头函数转成普通函数，let转成var， 类语法转成函数等等，这就是一个插件的集合，把这些插件都封装到一个所谓的预设中去。

.babelrc文件不需要单独引入，在打包的时候默认就会去找这个文件，自动读取。

**执行脚本配置**

配置运行时脚本：

```javascript
"scripts": {
    "dev": "rollup -c -w"
},
```
其中，`-c`表示要使用`rollup.config.js`这个配置文件， `-w`表示文件变化的时候重新打包

```json
"scripts": {
    "build:dev": "rollup -c",
    "serve": "cross-env ENV=development rollup -c -w"
}
```

## 二.Vue响应式原理

```javascript
// Vue2.0中，本质是一个构造函数
function Vue(options) {
    // console.log(options)
    this._init(options)  // 当用户new Vue的时候， 就调用init方法进行vue的初始化操作
}

// 如果有很多的方法，放在同一个文件中就会很乱，可以拆分逻辑到不同的文件中， 更利于代码的维护  --- 模块化概念
Vue.prototype._init = function (options) {

}

export default Vue
```

导出`vue`构造函数

```js
import {initMixin} from './init'

function Vue(options) {
    this._init(options)
}
initMixin(Vue) // 给原型上新增_init方法
export default Vue
```

`init`方法中初始化`vue`状态
```js
import {initState} from './state'
export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        const vm  = this
        // 实例上有个$options属性，表示用户传入的所有属性
        vm.$options = options
        // 初始化状态
        initState(vm)
    }
}
```

根据不同属性进行初始化操作
```js
export function initState(vm){
    const opts = vm.$options;
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethod(vm);
    }
    if(opts.data){
        // 初始化data
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }
}
function initProps(){}
function initMethod(){}
function initData(){}
function initComputed(){}
function initWatch(){}
```

### 1.初始化数据

```js
import {observe} from './observer/index.js'
function initData(vm){
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    observe(data);
}
```

### 2.递归属性劫持

```js
class Observer { // 观测值
    constructor(value){
        this.walk(value);
    }
    walk(data){ // 让对象上的所有属性依次进行观测
        let keys = Object.keys(data);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let value = data[key];
            defineReactive(data,key,value);
        }
    }
}
function defineReactive(data,key,value){
    observe(value);
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            if(newValue == value) return;
            observe(newValue);
            value = newValue
        }
    })
}
export function observe(data) {
    if(typeof data !== 'object' || data == null){
        return;
    }
    return new Observer(data);
}
```

### 3.数组方法的劫持

```js
import {arrayMethods} from './array';
class Observer { // 观测值
    constructor(value){
        if(Array.isArray(value)){
            value.__proto__ = arrayMethods; // 重写数组原型方法
            this.observeArray(value);
        }else{
            this.walk(value);
        }
    }
    observeArray(value){
        for(let i = 0 ; i < value.length ;i ++){
            observe(value[i]);
        }
    }
}
```
