1. 注意版本：

```javascript
"html-webpack-plugin": "^5.5.0",
"webpack": "^5.71.0",
"webpack-cli": "^4.9.2",
"webpack-dev-server": "^4.8.0"
```
node 版本： 14.18.1

2. 注意webpack配置文件中写法
  
```javascript
devServer: {
  static: {   // 对应 contentBase
    directory: path.join(__dirname, './release')
  },
  open: true,
  port: 8000
},
```

3. babel版本问题：

```javascript
"@babel/core": "^7.17.8",
"@babel/plugin-transform-runtime": "^7.17.0",
"@babel/polyfill": "^7.12.1",
"@babel/preset-env": "^7.16.11",
"babel-loader": "^8.2.4",
```

babel配置：
```javascript
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage", // 在每个文件中使用polyfill时，为polyfill添加特定导入。利用捆绑器只加载一次相同的polyfill
      "modules": false, // 启用将ES6模块语法转换为其他模块类型，设置为false不会转换模块
      "targets": {
        "browsers": "last 2 versions, not ie <= 9"
      }
    }]
  ]
}
```

## 面向对象

### 继承
> 子类继承父类

### 封装
> 数据的权限和保密

### 多态
> 同一接口不同实现


