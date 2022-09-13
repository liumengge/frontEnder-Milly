## React 的特性

- 声明式设计 - React采用声明范式，可以轻松描述应用
- 高效 - React通过对DOM的模拟(虚拟DOM)，最大限度地减少与DOM的交互
- 灵活 - React可以与已知的库或框架很好的配合
- JSX - JavaScript 语法的扩展
- 组件 - 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中
- 单向的数据流 - React实现了单向响应的数据流，从而减少了重复代码，所以它比传统数据绑定更简单

## 虚拟 DOM

传统DOM更新：真实页面对应一个DOM树，在传统页面的开发模式中，每次需要更新页面时，都要手动操作DOM来更新
虚拟DOM：将真实 DOM 树转换成 JavaScript 对象树，即 Virtual DOM。


## 使用脚手架创建 react 项目

1. node 版本：16.15.1
2. 全局安装 create-react-app：`npm i -g create-react-app`，如果不想全局安装，可以使用 `npx create-react-app my-react-app`
3. 创建项目 my-react-app：`create-react-app my-react-app`
   1. react：react的顶级库
   2. react-dom：因为 react 有很多运行环境，比如app端的react-native，要在 web 上运行就使用 react-dom
   3. react-script：包含运行和打包 react 应用程序的所有脚本及配置
4. 脚手架生成的项目目录：
  ```JavaScript
  - README.md：使用方法文档
  - package.json：项目说明文件
  - package-lock.json：锁定安装时的包版本号，保证团队的依赖能够保持一致
  - node_modules：所有的依赖安装的目录
  - public：静态公共目录
  - src：开发用的源代码目录
  ```





