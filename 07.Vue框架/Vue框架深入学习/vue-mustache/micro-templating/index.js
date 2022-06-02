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
        console.log(str, 'step-0')
        str = str.replace(/[\r\t\n]/g, " ") // 删除 回车、制表、换行
        console.log(str, 'step-1')
        // 替换 <% 为 \t制表符，两种情况（赋值和js代码）
        // 赋值： 例如 <div id="<%=id%>">  ==>  <div id="\t=id%>">
        // js代码：例如 <% for ( var i = 0; i < items.length; i++ ) { %>  ==>  \t for ( var i = 0; i < items.length; i++ ) { %>
        str = str.split("<%").join("\t")
        console.log(str, 'step-2')
        // 替换'为\r ，最后一步会重新替换回来 
        // 节点属性操作赋值使用单引号，如果不替换 ,''>' 是会报错的
        // <div style='background:<%=color%>'><%=id%></div>   ==> p.push(' <div style='background:',color,''>',id,'</div>        ');
        str = str.replace(/((^|%>)[^\t]*)'/g, "$1\r")
        console.log(str, 'step-3')
        // 赋值解析：赋值后部分，拆分为三项，结合with，id就会成为实际的值，然后一直被push  <div id="\t=id%>"> ==>    <div id=" ,id, ">
        // 这里会消费掉 <%=xxx%>，
        // 那么剩下的 %>必然是js语句结尾的, \t必然是js语句的开头
        str = str.replace(/\t=(.*?)%>/g, "',$1,'")
        console.log(str, 'step-4')
        //js语句开始符号替换： 经过上一步后，还剩余的\t，是js语句的，这里就用 ');来结束 ，js语句会单开p.push,
        str = str.split("\t").join("');")
        console.log(str, 'step-5')
        // js语句结尾符号替换： %> 替换为 p.push, 这里把js语句内生成的字符串或者变量再push一次
        str = str.split("%>").join("p.push('")
        console.log(str, 'step-6')
        // 替换回车为\' ， 恢复str.replace(/((^|%>)[^\t]*)'/g, "$1\r") 去掉的'
        str = str.split("\r").join("\\'")
        console.log(str, 'step-7')
        return str
      }
     
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();