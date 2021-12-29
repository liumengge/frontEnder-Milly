## rollup vs webpack

1. 更注重打包成一个独立的类库，没有更多优化的功能，以ESM标准为目标的构建工具，其他功能需要借助插件
2. 特性: Tree Shaking


## 基本命令

rollup --help
rollup -h

rollup --version
rollup -v

rollup --import index.js --file dist.js --format cjs/umd/es/iife
rollup -i

// 两个输入文件，打包到dist目录下
rollup -i index.js -i testa.js --dir dist

rollup -i index.js --file dist.js --format umd --name Index

rollup -i index.js --file dist.js --format umd --name Index --watch




## 配置文件 rollup.config.js

```javascript
export default {
  input: 'index.js',
  output: {
    file: "dist1.js",
    format: 'umd',
    name: 'Index'
  }
}
```

rollup --config rollup.config.js

// 设置MODE 环境变量为 local
rollup --config rollup.config.js --environment MODE:local

```javascript
const mode = process.env.MODE
const isLocal = mode === 'local' ? true : false

// 根据环境变量选择不同的打包模式
export default {
  input: 'index.js',
  output: {
    file: "dist1.js",
    format: isLocal ? 'es' : 'umd',
    name: 'Index'
  }
}
```

plugins：- github

比如：@rollup/

npm init -y

一般会增加rollup的项目依赖，而不是安装在全局，因为每个项目依赖的版本可能不同
npm i rollup @rollup/plugin-json

使用：

index.js中引入package.json

```javascript
import { funA } from './testa'
import pkg from './package.json'

console.log(pkg)

funA()
console.log('hello')
export const x = 123
```

编译：rollup --config rollup.config.js

报错，因为 rollup 默认不支持打包json，需要借助插件

rollup --config rollup.config.js --plugin json

报错，因为现在还是直接是在命令行使用rollup启动，这时使用的是全局命令，但是全局并没有安装json plugin 所以找不到plugin，需要找到安装在项目中的plugin

./node_modules/.bin/rollup --config rollup.config.js --plugin json

成功。