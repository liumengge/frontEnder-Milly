// 声明文件：当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
// 在 src 目录下创建 jQuery.d.ts 文件，在该文件中声明定义即可直接使用，声明文件会被自动引入，不需要额外引入
jQuery('id')

/* 
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
声明语句: 如果需要ts对新的语法进行检查, 需要要加载了对应的类型说明代码
  declare var jQuery: (selector: string) => any;
声明文件: 把声明语句放到一个单独的文件（jQuery.d.ts）中, ts会自动解析到项目中所有声明文件
下载声明文件: npm install @types/jquery --save-dev
*/

import jQuery from "jquery"
// 会去找 typeScript/03_webpack_ts/node_modules/@types/jquery 下的 .d.ts 声明文件
jQuery('test')