## 基本原理

1. 使用属性检查来进行缓存
2. 采用正则替换标签（赋值标签，js语句标签）
3. 使用with设置代码在对象中的作用域
4. 动态构建执行函数
5. 通过判断决定返回结果类型，如果执行时不传入data参数，返回的执行函数，可以延迟使用，到处使用

## Micro-Templating分析

框架：IIFE
```javascript
(function(){
  var cache = {}
  this.tmpl = function tmpl(str, data){}
})()
```

str的作用是什么？在tmpl函数中首先会看到这样一个判断：
```javascript
var fn = !/\W/.test(str) ?
  cache[str] = cache[str] ||
    tmpl(document.getElementById(str).innerHTML) : new Function(...)
```
正则`\w`和`\W`的区别？
- \w :匹配包括下划线的任何单词字符,等价于 [A-Z a-z 0-9_]
- \W :匹配任何非单词字符,等价于 [^A-Z a-z 0-9_]

`!/\W/.test(str)`代码用来判断str中是否包含模板分隔符：
- 不包含模板分隔符：当作id，走`cache[str] = cache[str]`，或者`document.getElementById(str).innerHTML`获取模板再调用tmpl，比如可以这样用：`const tpl = this.tmpl('data_tmpl', data)`
- 包含模板分隔符：直接走`new Function(...)`，`new Function(...)`逻辑是Micro-Templing模板引擎的核心逻辑。

## debug 看下`new Function(...)`

index.js
```javascript
// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
(function(){
  var cache = {};
   
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
       
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
         
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
         
        // Convert the template into pure JavaScript
        getStr(str) +
        "');}return p.join('');"
      );

      function getStr(str) {
        debugger
        console.log(str, 'step-0')
        str = str.replace(/[\r\t\n]/g, " ")
        console.log(str, 'step-1')

        // 赋值： 例如 <div id="<%=id%>">  ==>  <div id="\t=id%>">
        // js代码：例如 <% for ( var i = 0; i < items.length; i++ ) { %>  ==>  \t for ( var i = 0; i < items.length; i++ ) { %>
        str = str.split("<%").join("\t")
        console.log(str, 'step-2')

        // <div style='background:<%=color%>'><%=id%></div>   ==> p.push(' <div style='background:',color,''>',id,'</div>        ');
        str = str.replace(/((^|%>)[^\t]*)'/g, "$1\r")
        console.log(str, 'step-3')

        //  <div id="\t=id%>"> ==>    <div id=" ,id, ">
        str = str.replace(/\t=(.*?)%>/g, "',$1,'")
        console.log(str, 'step-4')
        
        str = str.split("\t").join("');")
        console.log(str, 'step-5')
        
        str = str.split("%>").join("p.push('")
        console.log(str, 'step-6')
        
        str = str.split("\r").join("\\'")
        console.log(str, 'step-7')
        return str
      }
     
    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };
})();
```

index.html
```html
<!-- 用来存放输出模板 -->
 <div class="container"></div>
 <!-- 引入模板引擎 -->
<script src="./index.js" ></script>
<!-- 模板 -->
<script type="text/template" id="data_tmpl">
  <% for ( var i = 0; i < items.length; i++ ) { %>    
    <% if( i%2 == 0) {%>
      <li><%=items[i].id%>:<%=items[i].name%></li>
    <% } %> 
  <% } %>
  <% print('数组长度' + items.length ); %>
  <div style='background:<%=color%>'><%=id%></div>
</script>
<!-- js执行 -->
<script>
  const data = {
    id: '000',
    items: [
      {id: '001', name: 'Milly'},
      {id: '002', name: 'Moon'},
      {id: '003', name: 'Cindy'}
    ],
    color: 'red'
  }
  const tpl = this.tmpl('data_tmpl', data)
  const container = document.querySelector('.container')
  container.innerHTML = tpl
</script>
```

getStr函数中的7步骤输出结果如下：

- step-0: str模板
```javascript
"\n    <% for ( var i = 0; i < items.length; i++ ) { %>    \n      <% if( i%2 == 0) {%>\n        <li><%=items[i].id%>:<%=items[i].name%></li>\n      <% } %> \n    <% } %>\n    <% print('数组长度' + items.length ); %>\n    <div style='background:<%=color%>'><%=id%></div>\n  "
```
- step-1: `str = str.replace(/[\r\t\n]/g, " ")`删除 回车、制表、换行
```javascript
"     <% for ( var i = 0; i < items.length; i++ ) { %>           <% if( i%2 == 0) {%>         <li><%=items[i].id%>:<%=items[i].name%></li>       <% } %>      <% } %>     <% print('数组长度' + items.length ); %>     <div style='background:<%=color%>'><%=id%></div>   "
```
- step-2: `str = str.split("<%").join("\t")`替换 `<%` 为 `\t` 制表符（赋值和js代码）
```javascript
"     \t for ( var i = 0; i < items.length; i++ ) { %>           \t if( i%2 == 0) {%>         <li>\t=items[i].id%>:\t=items[i].name%></li>       \t } %>      \t } %>     \t print('数组长度' + items.length ); %>     <div style='background:\t=color%>'>\t=id%></div>   "
```
- step-3: `str = str.replace(/((^|%>)[^\t]*)'/g, "$1\r")`替换 `'` 为 `\r`，节点属性操作赋值使用单引号，如果不替换 `,''>'`会报错
```javascript
"     \t for ( var i = 0; i < items.length; i++ ) { %>           \t if( i%2 == 0) {%>         <li>\t=items[i].id%>:\t=items[i].name%></li>       \t } %>      \t } %>     \t print('数组长度' + items.length ); %>     <div style=\rbackground:\t=color%>\r>\t=id%></div>   "
```
- step-4: `str = str.replace(/\t=(.*?)%>/g, "',$1,'")`赋值解析。这里会消费掉 `<%=xxx%>`，剩下的 `%>` 必然是js语句结尾的, `\t` 必然是js语句的开头
```javascript
"     \t for ( var i = 0; i < items.length; i++ ) { %>           \t if( i%2 == 0) {%>         <li>',items[i].id,':',items[i].name,'</li>       \t } %>      \t } %>     \t print('数组长度' + items.length ); %>     <div style=\rbackground:',color,'\r>',id,'</div>   "
```
- step-5: `str = str.split("\t").join("');")`js语句开始符号替换，经过上一步后，还剩余的 `\t`，是js语句的，这里用 `');`来结束，js语句会单开`p.push`
```javascript
"     '); for ( var i = 0; i < items.length; i++ ) { %>           '); if( i%2 == 0) {%>         <li>',items[i].id,':',items[i].name,'</li>       '); } %>      '); } %>     '); print('数组长度' + items.length ); %>     <div style=\rbackground:',color,'\r>',id,'</div>   "
```
- step-6: `str = str.split("%>").join("p.push('")`js语句结尾符号替换，`%>` 替换为 `p.push`, 把js语句内生成的字符串或者变量再push一次
```javascript
"     '); for ( var i = 0; i < items.length; i++ ) { p.push('           '); if( i%2 == 0) {p.push('         <li>',items[i].id,':',items[i].name,'</li>       '); } p.push('      '); } p.push('     '); print('数组长度' + items.length ); p.push('     <div style=\rbackground:',color,'\r>',id,'</div>   "
```
- step-7: `str = str.split("\r").join("\\'")`替换 `\r` 为 `\'`， 恢复`str.replace(/((^|%>)[^\t]*)'/g, "$1\r")` 去掉的单引号
```javascript
"     '); for ( var i = 0; i < items.length; i++ ) { p.push('           '); if( i%2 == 0) {p.push('         <li>',items[i].id,':',items[i].name,'</li>       '); } p.push('      '); } p.push('     '); print('数组长度' + items.length ); p.push('     <div style=\\'background:',color,'\\'>',id,'</div>   "
```

最终得到的 `new Function(...)`为：
```javascript
new Function("obj",
  "var p=[],print=function(){p.push.apply(p,arguments);};" +
  "with(obj){p.push('" +
  "     '); for ( var i = 0; i < items.length; i++ ) { p.push('           '); if( i%2 == 0) {p.push('         <li>',items[i].id,':',items[i].name,'</li>       '); } p.push('      '); } p.push('     '); print('数组长度' + items.length ); p.push('     <div style=\\'background:',color,'\\'>',id,'</div>   " +
  "');}return p.join('');"
)
```
创建得到的匿名函数为：
```javascript
(function anonymous(obj) {
  var p = []
    , print = function() {
      p.push.apply(p, arguments);
  };
  with (obj) {
    p.push('     ');
    for (var i = 0; i < items.length; i++) {
      p.push('           ');
      if (i % 2 == 0) {
        p.push('         <li>', items[i].id, ':', items[i].name, '</li>       ');
      }
      p.push('      ');
    }
    p.push('     ');
    print('数组长度' + items.length);
    p.push('     <div style=\'background:', color, '\'>', id, '</div>   ');
  }
  return p.join('');
})
```

## 模板引擎的应用







