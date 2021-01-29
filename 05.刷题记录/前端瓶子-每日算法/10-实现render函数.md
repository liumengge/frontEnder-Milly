> 模板渲染：
> 实现一个 `render(template, context)` 方法，将 `template` 中的占位符用 context 填充。

- 示例：

```javascript
var template = "{{name}}很厉害，才{{age}}岁"
var context = {name:"bottle",age:"15"}
输入：template context
输出：bottle很厉害，才15岁
```
- 要求：
  - 级联的变量也可以展开
  - 分隔符与变量之间允许有空白字符

[来源：百度-模板渲染](https://github.com/sisterAn/JavaScript-Algorithms/issues/36)


```javascript
String.prototype.render = function (context) {
  return this.replace(/{{(.*?)}}/g, (match, key) => context[key.trim()]);

};

// 测试
"{{name}}很厉name害，才{{ age }}岁".render({ name: "jawil", age: "15" });
```

- `str.replace(regexp|substr, newSubStr|function)` ，我们可以发现 replace 方法可以传入 function 回调函数，`function (replacement)` 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。
- `.*?` 是正则固定搭配用法，表示非贪婪匹配模式，尽可能匹配少的
- 这行代码的意思是，正则匹配到`{{name}}`，分组获取 `name`，然后把 `{{name}}` 替换成 `obj[name]`, age的替换也是一样


