- [快速创建一个Express应用框架](#快速创建一个express应用框架)
- [创建数据库](#创建数据库)

## 快速创建一个Express应用框架

计算机环境：win7系统，node版本 13.9.0

```javascript
npm install express-generator -g

express servertest --view=ejs

cd servertest

SET DEBUG=servertest :* & npm start
```
设置修改代码后项目自启动：
```javascript
npm install nodemon
```
修改package.json中script脚本：node改为nodemon。以后再npm start启动项目修改完代码之后就不需要手动重启项目了。

至此，一个express应用就创建成功了，其目录主要结构和功能在实战MyTODO_server中有介绍，这里不再重复。

安装Node的ORM框架sequelize：
```javascript
npm install sequelize

npm install mysql2
```

-g全局安装，会自动添加环境变量。用于快速生成sequelize框架
```javascript
npm install sequelize-cli -g

sequelize init
```
看一下sequelize初始化新生成的文件结构：

- `config/config.json`：sequelize所需要连接数据库的配置文件
- `migrations`：迁移，如果要对数据库做新增表、修改字段、删除表等操作就需要在这里添加迁移文件
- `models/index.js`：模型文件，使用sequelize执行CURD(创建、修改、读取和删除)，需要用到这里的模型，每个模型都会对应数据库中的一张表
- `seeders`：存放种子文件，一般是将需要添加到数据库中的测试数据添加到这里，只需要一个命令就会自动填充测试内容

## 创建数据库

> 在这之前要先安装MySQL数据库，可以去官网下载安装。本人使用的是一个集成开发环境WampServer(Windows+Apache+MySQL+PHP)

修改config下的配置文件：
```javascript
"development": {
    "username": "root",
    "password": "root",
    "database": "todo",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

- 创建数据库：
    ```javascript
    sequelize db:create --charset 'utf8mb4'
    ```
    创建完成之后打开数据库客户端工具Navicat刷新，会看到todo连接下会出现一个新的名为todo的表。当然，创建数据库直接使用客户端工具手动创建也是一样的效果。

- 创建模型：
  ```javascript
  sequelize model:generate --name Article --attributes title:string,context:text
  ```
  上述命令表示创建了一个模型名字为Article，这个表一共有两个字段：标题(string类型)，内容(text类型)。
  
  运行这条指令之后会发现model文件夹下生产了article.js文件，迁移文件目录下生成了一个迁移文件，这里存储的是article这张表的字段。注意，sequelize规定模型名字为单数，迁移文件中表的名称是复数。这个迁移文件中有up和down两个操作，up是建表，down是删除表，在up中除了设置的字段还生成了如下字段：
  ```javascript
  id: {
    allowNull: false,   // 不允许为空
    autoIncrement: true,   // 自增
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  createdAt: {  // 新增的时候自动填充一个时间
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {  // 修改的时候自动更新一个时间
    allowNull: false,
    type: Sequelize.DATE
  }
  ```
- 运行迁移文件：`sequelize db:migrate`，打开Navicat刷新之后会看到生成的articles表，里面的字段就是迁移文件中定义好的字段
- 添加测试数据,新建种子文件：`sequelize seed:generate --name article`，运行这行指令之后会看到在种子文件夹下会生成一个种子文件
- 修改种子文件：把里面的案例中的People改成我们的表名articles，然后根据之前创建的字段修改需要添加的数据默认值。比如：
- 运行迁移：`sequelize db:seed:all`，运行之后打开Navicat刷新就会看到新添加的表格数据了

