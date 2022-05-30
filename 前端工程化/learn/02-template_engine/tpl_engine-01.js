
var template = '<p>Hello, my name is <%name%>. I am  <%age%> years old.</p>'

var data = {
  name: 'Milly',
  age: 18
}
// template: 一个字符串，使用p标签包裹，<% _ %> 中标注变量，真正展示的应该是 data 数据中替换的值

var regex = /<%([^%>]+)?%>/g  // 正则：匹配以<%开头，以%>结尾的字符串，且中间不能包含 %或>
console.log(regex.exec(template), 'regex.exec(template)')
console.log(regex.exec(template), 'regex.exec(template)')
console.log(regex.exec(template), 'regex.exec(template)')

// 模板引擎
var TemplateEngine = function (tpl, data) {
  while (match = regex.exec(tpl)) { // (1)
    tpl = tpl.replace(match[0], data[match[1]]) // (2)
  }
  return tpl // (3)
}

// 上述模板引擎做了什么？
// (1)第一次循环 match = ["<%name%>", "name"]
// (2)tpl = tpl.replace('<%name%>','Milly')
// (3)返回 tpl    '<p>Hello, my name is Milly. I am  <%age%> years old.</p>'

// (1)第二次循环 match = ["<%age%>", "age"]
// (2)tpl = tpl.replace('<%age%>','18')
// (3)返回tpl    '<p>Hello, my name is Milly. I am  18 years old.</p>'

var string = TemplateEngine(template, data)
console.log(string)
document.body.innerHTML = string

// 所以，模板引擎基本原理是什么？

// 要素
  // template： 模板文件
  // data：数据
  // TemplateEngine： 模板引擎

// 产物
  // string：HTML文件