- [git安装与初始化](#git安装与初始化)
  - [git安装](#git安装)
  - [git初始配置与基本使用](#git初始配置与基本使用)
- [分支](#分支)
  - [创建分支](#创建分支)
  - [切换分支](#切换分支)
  - [合并分支](#合并分支)
- [github](#github)
  - [github设置SSH](#github设置ssh)
  - [提交代码到github(当作git服务器来用)](#提交代码到github当作git服务器来用)

## git安装与初始化

### git安装

1. [官网安装](https://git-scm.com/)
2. [镜像地址](https://npm.taobao.org/mirrors/git-for-windows/)

安装过程很简单，直接搜一个帖子照着一路安装即可

- 这个仓库会存放，git对我们项目代码进行备份的文件
- 在项目目录右键打开`git bash`
- 命令: `git init`

### git初始配置与基本使用

1. 初次运行git前的配置

- 用户信息

```javascript
配置用户名
git config --global user.name "Mengge Liu"

配置邮箱
git config --global user.email "liumengge_milly@163.com"
```
注意：如果使用了`--global`选项，则该命令只需要运行一次，之后不管你在该系统上做什么事情，git都会使用那些信息。当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 `–global` 选项的命令来配置。

- 检查配置信息

使用`git config --list`来查看配置项。

也可以使用`git config 配置项名称`来查看其中某一项配置。

2. 把代码存储到.git仓储中
   - 1.把代码放到仓储的门口
       + `git add ./readme.md` 所指定的文件放到暂存区
       + `git add ./` 把所有的修改的文件添加到暂存区
   - 2.把仓储门口的代码放到里面的房间中去
       + `git commit -m "这是对这次添加的东西的说明" `

![](../images/git/git存储.png)


3. 查看当前的状态

- 可以用来查看当前代码有没有被放到仓储中去
- 命令: `git status`  
  - 红色modified表示修改过但是还没有放到暂存区；  
  - 绿色modified表示已经将修改过的文件添加到了暂存区，但是还没有放入版本库
  - nothing to... 表示没有修改或者上次的存储工作已经完成

4. git中的忽略文件

- .gitignore,在这个文件中可以设置要被忽略的文件或者目录。
- 被忽略的文件不会被提交仓储里去.
- 在.gitignore中可以书写要被忽略的文件的路径，以/开头，
    一行写一个路径，这些路径所对应的文件都会被忽略，
    不会被提交到仓储中
    + 写法
        * ` /.idea  ` 会忽略.idea文件
        * ` /js`      会忽略js目录里的所有文件
        * ` /js/*.js` 会忽略js目录下所有js文件

5. 查看日志

- `git log`：查看历史提交的日志
- `git log --oneline`：可以看到简洁版的日志

6. 回退到指定的版本

- `git reset --hard Head~0`：表示回退到上一次代码提交时的状态
- `git reset --hard Head~1`：表示回退到上上次代码提交时的状态
- `git reset --hard [版本号]`：版本号指的是在提交的时候随机生成的那个字符串，可以通过版本号精确的回退到某一次提交时的状态
- `git reflog`：可以看到每一次切换版本的记录:可以看到所有提交的版本号， 在最左边的字符串

## 分支

### 创建分支
- `git branch dev`
    + 创建了一个dev分支
    + 在刚创建时dev分支里的东西和master分支里的东西是一样的

### 切换分支
- `git checkout dev`
    + 切换到指定的分支,这里的切换到名为dev的分支
    `git branch` 可以查看当前有哪些分支

### 合并分支
- `git merge dev`
    + 合并分支内容, 把当前分支与指定的分支(dev)进行合并
    + 当前分支指的是`git branch`命令输出的前面有*号的分支
- 合并时如果有冲突，需要手动去处理，处理后还需要再提交一次.


![](../images/git/git分支.png)

## github

- https://github.com
- 不是git, 只是一个网站
- 只不过这个网站提供了允许通过git上传代码的功能

### github设置SSH

从github上clone项目主要有两种方式：
- `https url`方式，比如使用https的方式clone该项目到本地，在`git bash`中输入：`git clone https://github.com/liumengge/frontEnder-Milly.git`
- SSH的方式
- https 和 SSH 的区别
  - https可以随意克隆github上的项目；SSH则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加`SSH key` ，否则无法克隆
  - `https url`在push的时候是需要验证用户名和密码的；SSH 在push的时候，不需要输入用户名，如果配置SSH key的时候设置了密码，则需要输入密码，否则直接是不需要输入密码的


在github上添加`SSH Key`的步骤：
- 检查自己电脑上是不是已经存在`SSH key`，即运行git bash，输入`cd ~/.ssh`和`ls`，这两个命令用于检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，则可以跳过下面的创建SSH key的步骤进行下一步操作。
- 创建SSH key：git bash 中输入`ssh-keygen -t rsa -C "liumengge_milly@163.com"`
  - 上述代码的含义为：
    - `-t`：表示密钥类型，默认是rsa，可以省略； 
    - `-C`：设置注释文字，比如邮箱；
    - `-f`：指定密钥文件存储文件名，以上代码省略了这个参数，运行上述代码后会让你输入一个文件名，用于保存刚才生成的SSH key代码，可以直接按`Enter`键，使用默认文件名(推荐)，那么就会生成`id_rsa`和`id_rsa.pub`两个密钥文件。
  - 接下来会提示输入两次密码，这个密码是push文件的时候需要输入的密码，也可以不输入，直接按`Enter`，以后push文件的时候就不需要输入密码，直接提交到github上。
- 添加创建的SSH key到github上去
  - 拷贝`id_rsa.pub`文件的内容，可以使用编辑器打开文件复制或者使用git命令复制该文件的内容，即：`clip < ~/.ssh/id_rsa.pub`
  - 登陆自己的github，右上角点击Settings，然后点击左侧的SSH and GPG keys, 点击`New SSH key`添加一个新的SSH key，把刚才复制的SSH key代码粘贴到key对应的输入框中，注意SSH key代码的前后不要留空格或者回车。

### 提交代码到github(当作git服务器来用)
- `git push [地址] master`
 + 示例: `git push https://github.com/huoqishi/test112.git master  master`
 + 会把当前分支的内容上传到远程的master分支上

- `git pull [地址] master`
 + 示例: `git pull https://github.com/huoqishi/test112.git master`
 + 会把远程分支的数据得到:(*注意本地-要初始一个仓储!*)

- `git clone [地址]`
 + 会得到远程仓储相同的数据,如果多次执行会覆盖本地内容。

