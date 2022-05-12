## 如何检测一个npm包名是否合法

本文收获：
- 了解npm包的命名规则
- 了解一种检测npm包名是否有效的方法
- 阅读npm包源码：validate-npm-package-name
- 有谁在使用：
  - [vue create xxx](https://github1s.com/vuejs/vue-cli/blob/HEAD/packages/@vue/cli/lib/create.js)
  - [create-react-app](https://github.com/facebook/create-react-app/blob/04482a6c2c6639c19deb330c48e4fa5573a1654e/packages/create-react-app/createReactApp.js#L48)

### npm包的命名规则

1. 包名长度不能为0，长度不能超过214
2. 包名必须是小写小写字母，不能混入大写字母
3. 包名可以包含连字符
4. 包名不能包含任何`non-url-safe`字符，因为包名最终会是URL的一部分
5. 包名不能以`.`或`_`开头
6. 包名不能包含首位空格
7. 包名中不能包含`~)('!*`字符
8. 包名不能与node.js/io.js核心模块相同，也不能与保留的/黑名单相同，比如：`http、stream、node_modules、favicon.ico`等

### validate-npm-package-name 的使用

简介：这个包导出了一个函数，该函数接收一个字符串(npm包名)作为入参，返回值是一个包含两个属性的对象，即：
```javascript
{
  validForNewPackages: Boolean,
  validForOldPackages: Boolean
}
```

为了测试，先创建一个项目demo：

- 创建项目`package-name-test`
- `npm init -y`: 项目初始化
- `npm i validate-npm-package-name`: 安装依赖包
- 项目根目录创建index.js

1. 有效的npm包名

先来测试下这几个有效包名的输出结果是否符合预期：

```javascript
validate("some-package")
validate("example.com")
validate("under_score")
validate("123numeric")
validate("@npm/thingy")
validate("@jane/foo.js")
```

index.js
```javascript
const validate = require('validate-npm-package-name')

console.log(validate("some-package"))
console.log(validate("example.com"))
console.log(validate("under_score"))
console.log(validate("123numeric"))
console.log(validate("@npm/thingy"))
console.log(validate("@jane/foo.js"))
```

可以看到控制台输出结果：
```javascript
{ validForNewPackages: true, validForOldPackages: true }
{ validForNewPackages: true, validForOldPackages: true }
{ validForNewPackages: true, validForOldPackages: true }
{ validForNewPackages: true, validForOldPackages: true }
{ validForNewPackages: true, validForOldPackages: true }
{ validForNewPackages: true, validForOldPackages: true }
```
表示都是有效的npm包名称。

2. 无效的包名检测

index.js
```javascript
validate("excited!")
validate(" leading-space:and:weirdchars")
validate("eLaBorAtE-paCkAgE-with-mixed-case-and-more-than-214-characters-----------------------------------------------------------------------------------------------------------------------------------------------------------")
```
可以看到控制台的输出结果：
![](./package-name-test/images/invalid-2.jpg)
第一个包名检测提示了一个warning：`name can no longer contain special characters ("~\'!()*")'`也就是说包名中含有特殊字符`!`在新的包命名规范中将不会被允许。

第二个包名检测直接给出了error数组。一个错误是包名首尾有空格，另一个是因为包名中含有URL中的特殊字符`:`。

第三个包名检测给出了warning数组。在npm的旧时代，包名没有那么多限制。比如，可以有大写字母，可能会很长，可以是node核心模块中现有模块的名称。如果给validate函数一个曾经有效的包名，会看到`validForNewPackages`属性的值发生了变化，并且会出现一个警告数组。

除了以上简单的demo，像是我们使用的前端脚手架vue-cli中也在使用：
```javascript
const { chalk, error, stopSpinner, exit } = require('@vue/cli-shared-utils')
const validateProjectName = require('validate-npm-package-name')

const result = validateProjectName(name)
if (!result.validForNewPackages) {
  console.error(chalk.red(`Invalid project name: "${name}"`))
  result.errors && result.errors.forEach(err => {
    console.error(chalk.red.dim('Error: ' + err))
  })
  result.warnings && result.warnings.forEach(warn => {
    console.error(chalk.red.dim('Warning: ' + warn))
  })
  exit(1)
}
```

源码地址：[vue create xxx](https://github1s.com/vuejs/vue-cli/blob/HEAD/packages/@vue/cli/lib/create.js)

### validate-npm-package-name 源码阅读

> [源码地址](https://github.com/npm/validate-npm-package-name)

首先来看源码整体结构：

![](package-name-test/images/yuanma-01.jpg)

从整体结构来看，有这个几个变量：
- `scopedPackagePattern`：
- `builtins`：其中罗列了node核心模块的模块名称
- `blacklist`：黑名单list
- `validate`：`validate-npm-package-name`导出的函数，关键逻辑就在这里
- 将`scopedPackagePattern`挂在了`validate`上
- `done`函数：用来组装检测结果

接下来，将其逐步拆解开。

validate函数内部一共做了3件事情：
- 声明变量warnings和errors，如果校验过程中出现warning项和error项，就像使用小节中一样，作为属性打印在控制台上
- 7条if语句+黑名单名称过滤，匹配error：
  - 包名不能为`null`：
    ```javascript
    if (name === null) {
      errors.push('name cannot be null')
      return done(warnings, errors)
    }
    ```
  其中，done函数做的事情是将warnings和errors包装成一个对象返回，即：
    ```javascript
    var done = function (warnings, errors) {
      // 最终返回结果
      var result = {
        // 如果没有waring且没有error，就是一个有效的新包命名
        // 如果没有error，有或没有warning，都是一个有效的旧包名
        validForNewPackages: errors.length === 0 && warnings.length === 0,
        validForOldPackages: errors.length === 0,
        warnings: warnings,
        errors: errors
      }
      // 校验之后如果有warning或者error才会封装到result中返回，如果没有就删除掉
      if (!result.warnings.length) delete result.warnings
      if (!result.errors.length) delete result.errors
      return result
    }
    ```
  - 包名不能为`undefined`:
    ```javascript
    if (name === undefined) {
      errors.push('name cannot be undefined')
      return done(warnings, errors)
    }
    ```
  - 包名需要是一个字符串类型的
    ```javascript
    if (typeof name !== 'string') {
      errors.push('name must be a string')
      return done(warnings, errors)
    }
    ```
  以上3个条件属于边界条件，如果不满足就直接return。
  - 包名的长度不能为0
    ```javascript
    if (!name.length) {
      errors.push('name length must be greater than zero')
    }
    ```
  - 包名不能以`.`开头
    正则：
    ![](package-name-test/images/reg-01.jpg)
    ```javascript
    // 如果没有match到的话就是null， 如果有，就是一个数组
    if (name.match(/^\./)) {
      errors.push('name cannot start with a period')
    }
    ```
  - 包名不能以`_`开头
    正则：
    ![](package-name-test/images/reg-02.jpg)
    ```javascript
    if (name.match(/^_/)) {
      errors.push('name cannot start with an underscore')
    }
    ```
  - 包名首尾不能有空格
    ```javascript
    if (name.trim() !== name) {
      errors.push('name cannot contain leading or trailing spaces')
    }
    ```
  - 包名不能与黑名单列表(保留字)中的名称相同：
    ```javascript
    blacklist.forEach(function (blacklistedName) {
      if (name.toLowerCase() === blacklistedName) {
        errors.push(blacklistedName + ' is a blacklisted name')
      }
    })
    ```
- 符合旧包命名规范，但不符合新包命名规范的提示 warning
  - 包名不能与 Node 内置核心 module 名称相同
    ```javascript
    var builtins = require('builtins')
    builtins.forEach(function (builtin) {
      if (name.toLowerCase() === builtin) {
        warnings.push(builtin + ' is a core module name')
      }
    })
    ```
    其中builtins有：
    ![](package-name-test/images/builtins.png)
    `validate-npm-package-name`依赖的`builtins`包具体使用在后面会详细展开。
  - 包名长度不能大于214
    ```javascript
    if (name.length > 214) {
      warnings.push('name can no longer contain more than 214 characters')
    }
    ```
  - 包名中不能混入大写字母
    ```javascript
    if (name.toLowerCase() !== name) {
      warnings.push('name can no longer contain capital letters')
    }
    ```
  - 包名中不能包含字符`~'!()*`
    ```javascript
    if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
      warnings.push('name can no longer contain special characters ("~\'!()*")')
    }
    ```
    其中，`/[~'!()*]/.test(string)`返回值为 true/false，如果包含特殊符号就警告。`name.split('/').slice(-1)[0])`可以获取两种形式的包名：
    - 类似`vue`的：`'vue'.split('/').slice(-1)[0]`获取包名
    - 带有scope的，类似`@vue/core`：`'@vue/core'.split('/').slice(-1)[0]`获取包名
  - 包名中不能包含`non-url-safe`字符
    ```javascript
    if (encodeURIComponent(name) !== name) {
      // Maybe it's a scoped package name, like @user/package
      var nameMatch = name.match(scopedPackagePattern)
      if (nameMatch) {
        console.log(nameMatch)
        var user = nameMatch[1]  // user
        var pkg = nameMatch[2]   // package
        if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
          // 无异常
          return done(warnings, errors)
        }
      }

      errors.push('name can only contain URL-friendly characters')
    }
    ```
    其中，`var scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$')`，可视化正则如下：
    ![](package-name-test/images/reg-03.jpg)


至此，validate函数的功能细节就全部实现了。

此外，在`validate-npm-package-name`包的源码中可能还会注意到一行代码`validate.scopedPackagePattern = scopedPackagePattern`，这行代码的作用是什么呢？从代码上看其实就是导出了一个正则提供给外部使用，具体怎么用，就具体情况具体分析了。

最后，来看下 builtins 到底是什么。[github-builtins](https://github.com/juliangruber/builtins)给出了这个几个用法：

1. 获取当前 Node.js 的核心模块列表

```javascript
var builtins = require('builtins')()

console.log(builtins.indexOf('http') > -1)  // true
```

2. 获取指定 Node.js 版本的核心模块列表

```javascript
var builtins = require('builtins')({ version: '0.6.0' })

console.log(builtins.indexOf('v8') > -1)  // false
```

3. 像列表中添加 experimental modules

```javascript
var builtins = require('builtins')({ experimental: true })

console.log(builtins.indexOf('wasi') > -1)  // true, version: 14.18.1
```

顺便看下源码：
```javascript
'use strict'
var semver = require('semver')  // npm的语义版本器

module.exports = function ({
  version = process.version,
  experimental = false
} = {}) {
  var coreModules = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'module',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'sys',
    'timers',
    'tls',
    'tty',
    'url',
    'util',
    'vm',
    'zlib'
  ]

  if (semver.lt(version, '6.0.0')) coreModules.push('freelist')
  if (semver.gte(version, '1.0.0')) coreModules.push('v8')
  if (semver.gte(version, '1.1.0')) coreModules.push('process')
  if (semver.gte(version, '8.0.0')) coreModules.push('inspector')
  if (semver.gte(version, '8.1.0')) coreModules.push('async_hooks')
  if (semver.gte(version, '8.4.0')) coreModules.push('http2')
  if (semver.gte(version, '8.5.0')) coreModules.push('perf_hooks')
  if (semver.gte(version, '10.0.0')) coreModules.push('trace_events')

  if (
    semver.gte(version, '10.5.0') &&
    (experimental || semver.gte(version, '12.0.0'))
  ) {
    coreModules.push('worker_threads')
  }
  if (semver.gte(version, '12.16.0') && experimental) {
    coreModules.push('wasi')
  }
  
  return coreModules
}
```

semver的源码就不在这里展开了，具体如果做语义版本管理可以去看[node-semver](https://github.com/npm/node-semver)，或许有时间会详细学习记录下。

### 参考资料

1. [encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
2. [builtins](https://www.npmjs.com/package/builtins)
3. [node-semver](https://github.com/npm/node-semver)