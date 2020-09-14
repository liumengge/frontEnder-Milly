## JS对象常用方法总结
- `Object.assign()` //复制对象，创建一个新的对象
- `Object.entries()` //返回自身可枚举的[key,value]
- `Object.keys()`
- `Object.values()`
- `Object.hasOwnProperty(key)` //是否有这个属性 ttrue/false
- `Object.getOwnPropertyNames()` //取得对象自身可枚举的属性名
//for in 对对象进行遍历，可以拿到自身以及原型链上的可枚举的属性
- `Object.freeze()` //冻结一个对象，不可修改，不可删除。不可添加新的属性
Object.prototype.toString()// 返回数组[object,object/array/function等]  
//判断是数组还是对象就是用的这个方法
Object.defineProerty(obj,attr,descriptor)