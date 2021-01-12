> 实现一个方法，拆解URL参数中queryString

- 输入参数格式参考: `http://sample.com/?a=1&b=2&c=xx&d=2#hash`
- 输出格式参考：`const result = { a: '1', b: '2', c: 'xx', d: '' };`, 拆解URL参数中queryString，返回一个 key - value 形式的 object

方法一：
```javascript
let parseURL = (url) => {
    let [queryString,] = url.split('?')[1].split('#');
    if(queryString) {
       return queryString.split('&').reduce((pre, cur) => {
           const [key, val] = cur.split('=');
           pre[key] = decodeURIComponent(val);
           return pre;
       }, {});
    }

    return {};
} 

// test
let queryParamsObj = parseURL('http://sample.com/?a=1&b=2&c=xx&d=2#hash');
console.log(queryParamsObj);
```


方法二：使用现有API --- 注意兼容性
```javascript
let parseURL = (url) => {
    const query = new URL(url).searchParams;
    const parsedObj = {};
    query.forEach((val, key) => {
        parsedObj[key] = val;
    })
    return parsedObj;
} 

// test
let queryParamsObj = parseURL('http://sample.com/?a=1&b=2&c=xx&d=2#hash');
console.log(queryParamsObj);
```

- 补充学习：[URL接口与URLSearchParams接口](https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/)

