1. 安装包及其作用：

```javascript
"vue": "^2.6.14",
"vue-router": "^3.5.3",
"vue-loader": "^15.9.8",   // 加载和转译 Vue 组件

"webpack": "^5.65.0",
"webpack-dev-server": "^4.7.1",

"babel": "^6.23.0",
"babel-eslint": "^10.1.0",
"babel-loader": "^8.2.3",    // 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
"babel-plugin-syntax-dynamic-import": "^6.18.0",
"babel-plugin-transform-object-rest-spread": "^6.26.0",
"babel-polyfill": "^6.26.0",   // 把ES6语法转换成IE浏览器能读取的ES5语法，通常用来兼容IE浏览器，防止出现白屏现象
"babel-preset-env": "^1.7.0",

"eslint": "^8.5.0",
"eslint-loader": "^4.0.2",  // PreLoader，使用 ESLint 清理代码
"eslint-plugin-html": "^6.2.0",

"html-webpack-plugin": "^5.5.0",

"extract-text-webpack-plugin": "^3.0.2",  // 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。 如果样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载

"css-loader": "^6.5.1",  //  解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
"style-loader": "^3.3.1",  // 将模块的导出作为样式添加到 DOM 中
"node-sass": "^7.0.1",
"postcss": "^8.4.5",
"postcss-loader": "^6.2.1",
"sass-loader": "^12.4.0",
"vue-style-loader": "^4.1.3",
"autoprefixer": "^10.4.0",

"file-loader": "^6.2.0",  // 将文件发送到输出文件夹，并返回（相对）URL
"url-loader": "^4.1.1",  // 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL

"friendly-errors-webpack-plugin": "^1.7.0",    // 用于控制台错误提示优化
```