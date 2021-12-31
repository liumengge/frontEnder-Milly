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

补充：如果全局没有安装rollup，可以通过配置npm脚本的方式来执行：

```javascript
"scripts": {
  "dev": "rollup index.js --file dist.js",
}
```

就可以通过`npm run dev`来打包。执行`npm run dev`就相当于执行`rollup index.js --file dist.js`也就相当于执行`./node_modules/.bin/rollup index.js --file dist.js`。

node_modules目录下的.bin目录中为什么会有rollup？

可以找到`node_modules/rollup`，里面有`dist/bin/rollup.js`，并且，rollup包的package.json文件中配置了bin属性：

```javascript
"bin": {
  "rollup": "dist/bin/rollup"
},
```
这就会根据该配置项将rollup包指定目录下的脚本文件copy到`node_modules/.bin`目录下，每当执行`npm run`，就会自动新建一个Shell，在这个Shell中执行指定的脚本命令，因此只要是Shell(一般是 Bash)可以运行的命令就可以写在npm脚本里面。执行`npm run`新建的这个Shell会将当前目录的`node_modules/.bin`子目录加入PATH变量，执行结束后将PATH变量恢复原样，所以，当前目录的`node_modules/.bin`子目录中的所有脚本都可以直接用脚本名调用，而不必加上路径。但是，在没有`npm i -g rollup`而是只在本项目中安装rollup的情况下是不可以直接在控制台通过`rollup index.js --file dist.js`执行的，控制台会提示：`zsh: command not found: rollup`，PATH中找不到, 通过`npm run`的方式是可以正常执行的。

而且发现，在`node_modules/rollup/dist/bin/rollup.js`文件顶部有一行之前没注意过的代码`#!/usr/bin/env node`，这是什么意思？

`#!/usr/bin/env node`是Unix和Linux脚本语言的第一行，目的就是指出，想要这个文件中的代码用什么可执行程序去运行它。除了`#!/usr/bin/env node`，还有`#!/usr/bin/node`。有什么区别？

- `#!/usr/bin/node`: 告诉操作系统执行这个脚本的时候，调用`/usr/bin`下的node解释器，相当于把路径写死了，但是并不是所有人的电脑上都是将node放在`/usr/bin`这个目录下的
- `#!/usr/bin/env node`：这种用法是为了防止操作系统用户没有将node装在默认的`/usr/bin`路径，当系统看到这一行的时候，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作，所以npm安装的依赖包中bin目录下的脚本文件第一行就是这条指令
## rollup 配置文件


