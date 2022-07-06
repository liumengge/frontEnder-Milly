## 插件目录结构

```javascript
.
├── .vscode
│   ├── launch.json     // 插件加载和调试的配置
│   └── tasks.json      // 配置TypeScript编译任务
├── .gitignore          // 忽略构建输出和node_modules文件
├── README.md           // 一个友好的插件文档
├── src
│   └── extension.ts    // 插件源代码
├── package.json        // 插件配置清单
├── tsconfig.json       // TypeScript配置
```

## 插件的配置清单 - package.json

package.json文件中原有的Node.js字段还是有的，除此之外，混合了vscode独有的字段，如：publisher、activationEvents、contributes等。这里记录几个基础字段的含义：

- name 和 publisher: VS Code 使用<publisher>.<name>作为一个插件的ID。
- activationEvents 和 contributes: 激活事件 and 发布内容配置。
- engines.vscode: 描述了这个插件依赖的最低VS Code API版本。
- postinstall 脚本: 如果你的engines.vscode声明的是1.25版的VS Code API，那它就会按照这个声明去安装目标版本。一旦vscode.d.ts文件存在于node_modules/vscode/vscode.d.ts，IntelliSense就会开始运作，你就可以对所有VS Code API进行定义跳转或者语法检查了

详情见项目中的package.json文件。

```javascript
"activationEvents": [
  // 注册 onCommand 激活事件，用户可以在输入Hello World命令后激活插件
  "onCommand:hello-vscode-ts.helloWorld"
],
"contributes": {
  // contributes.commands: 发布内容配置，绑定一个命令ID：hello-vscode-ts.helloWorld，然后 Hello World命令就可以在命令面板中使用了
  "commands": [
    {
      "command": "hello-vscode-ts.helloWorld",
      "title": "Hello World"
    }
  ]
},
```

## 插件入口文件 - extension.ts

```javascript
// 'vscode'模块包含了VS Code extensibility API
import * as vscode from 'vscode';

// 一旦插件激活，vscode会立刻调用下述方法
export function activate(context: vscode.ExtensionContext) {
	// 下面的代码只会在插件激活时执行一次
	console.log('Congratulations, your extension "hello-vscode-ts" is now active!');
  
  // 入口命令已经在 package.json 文件中定义好了，现在调用 registerCommand 方法
  // registerCommand 中的参数必须与 package.json 中的command保持一致
	let disposable = vscode.commands.registerCommand('hello-vscode-ts.helloWorld', () => {
    // 把代码写在这里，每次命令执行时都会调用这里的代码 ... 
    
    // 给用户显示一个消息提示
		vscode.window.showInformationMessage('Hello World from hello-vscode-ts!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
```

## 测试插件

npm run test 启动集成测试。

测试入口：./src/test/runTest.ts
测试脚本：./src/test/suite/index.ts

### 测试入口

```typescript
import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath });
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
```

该测试入口中提供了CLI参数`--extensionDevelopmentPath`和`--extensionTestsPath`来运行插件测试。如：
```
--extensionDevelopmentPath=<EXTENSION-ROOT-PATH>
--extensionTestsPath=<TEST-RUNNER-SCRIPT-PATH>
```

使用了 `@vscode/test-electron` API，简化了下载、解压、启动 VS Code 的测试流程.




### 测试脚本

