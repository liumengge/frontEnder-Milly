import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'

export default {
  // 用于打包的配置
  input: "./src/index.js", // 需要打包的文件入口地址
  output: {
    file: "dist/vue.js", // 打包之后的文件存储地址
    name: "Vue", // 全局的名字  Vue
    format: "umd", // 模块格式 - 统一模块规范，  默认情况下可以是将vue变量放在window上，可以支持commonJS规范，也可以支持ES6规范
    sourcemap: true, // 产生一个源码映射文件， ES6->ES5， 我们希望看的源码是ES6的
  },
  plugins: [
    babel({
      exclude: "node_modules/**", // 表示node_modules文件夹下的所有文件都忽略掉，这个文件夹下的内容都不需要babel转换
    }),
    serve({
        open: true,   // 自动打开浏览器
        openPage: '/public/index.html',
        port: 3000,
        contentBase: '',   // 表示以当前的根目录为基准，所以打开的页面的查找路径就是当前项目根目录下的public下的index.html文件
    })
  ],
};
