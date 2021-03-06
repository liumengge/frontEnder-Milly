- [为什么要用Flow](#为什么要用flow)
- [Flow的工作方式](#flow的工作方式)

## 为什么要用Flow
 
JavaScript的hi动态类型的语言，但是过于灵活的副作用是很容易写出非常隐蔽的隐患代码，甚至在编译期可能看上去都不会报错，但在运行阶段就可能出现各种奇怪的bug。类型检查时当前动态类型语言的发展趋势，所谓类型检查，就是在编译期尽早发现由类型错误引起的bug，不需要运行时动态检查类型，不会影响代码运行，使得编写JS具有和编写JAVA等强类型语言相近的体验。

项⽬越复杂就越需要通过⼯具的⼿段来保证项⽬的维护性和增强代码的可读性。 Vue.js 在做 2.0 重构的时候，在 ES2015 的基础上，除了 ESLint 保证代码⻛格之外，也引⼊了 Flow 做静态类型检查。之所以选择 Flow，主要是因为 Babel 和 ESLint 都有对应的 Flow 插件以⽀持语法，可以完全沿⽤现有的构建配置，⾮常⼩成本的改动就可以拥有静态类型检查的能⼒。


## Flow的工作方式

通常类型检查分成 2 种⽅式：
- 类型推断：通过变量的使⽤上下⽂来推断出变量类型，然后根据这些推断来检查类型。
- 类型注释：事先注释好我们期待的类型，Flow 会基于这些注释来判断。(更常用)

开始之前先安装一下flow: `npm install -g flow-bin`，然后执行`flow init`创建flow配置文件`.flowconfig`。


