- [`git reset` 与 `git revert`](#git-reset-与-git-revert)
  - [`git reset`历史版本切换](#git-reset历史版本切换)
  - [`git revert`撤销操作](#git-revert撤销操作)
  - [`git revert` 和 `git reset`的区别](#git-revert-和-git-reset的区别)
- [修改了`mater`上的代码怎么办](#修改了mater上的代码怎么办)
- [`git stash`暂存](#git-stash暂存)

## `git reset` 与 `git revert`

> 开开心心补充项目，到了push的时候有个文件太大了push不上去，就想着这个文件大家也能找到的，干脆不要上传了，可是我已经commit了，怎么回到之前的commit呢？

### `git reset`历史版本切换

首先，git要知道当前的版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新提交的版本，上一个版本就是HEAD^， 上上一个版本就是HEAD^^，此外，每一个版本都对应了一个commit_id。怎么查找commit_id？

`git log`看下自己之前的commit记录，emmm输出的内容太多了，不好看:cry:

以后查看直接用`git log --pretty=oneline`好了

![](../images/Network/git%20log.png)

上图中左侧黄色的非常长的字符串就是我每次commit生成的commit_id。如果想要回退到上上一个版本就可以使用`git reset --hard HEAD^^`，注意，reset有删除的意思，这时再`git log --pretty=oneline`，就会发现最新的两个版本已经不存在了。

如果这个时候你发现操作错了，还是想回到刚才那个最新的版本怎么办？使用`git reflog`, 这个命令按照之前经过的所有的commit路径按序排列，用来记录每一次命令。

![](../images/Network/reflog.png)

比如我想回到"变量提升练习的版本"，则`git reset --hard b61d4e5`，这样就又回到之前的那个版本了，想要拿的文件也拿到了。


### `git revert`撤销操作

`git revert` 撤销 某次操作，此次操作之前和之后的commit和history都会保留，并且把这次撤销
作为一次最新的提交
  - `git revert HEAD`                  撤销前一次 commit
  - `git revert HEAD^`               撤销前前一次 commit
  - `git revert commit_id(比如：fa042ce57ebbe5bb9c8db709f719cec2c58ee7ff)`撤销指定的版本，撤销也会作为一次提交进行保存。

`git revert`是提交一个新的版本，将需要revert的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容。

### `git revert` 和 `git reset`的区别
- `git revert`是用一次新的commit来回滚之前的commit，`git reset`是直接删除指定的commit
- 在回滚这一操作上看，效果差不多。但是在日后继续merge以前的老版本时有区别。因为`git revert`是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，导致这部分改变不会再次出现，但是`git reset`是直接把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入。 
- `git reset` 是把HEAD向后移动了一下，而`git revert`是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。

## 修改了`mater`上的代码怎么办

> 在实际开发中，不小心在master上直接做任务开发了，但是为了避免后序各种问题我们还是在自己分支上开发比较好，该怎么办呢？

- 在master上完成任务开发(或者没有全部完成也行)，完成commit，创建开发分支`git branch feature-git-test`(这个操作的意思是让feature-git-test分支指向最近的提交，但是还停留在master分支上)
- `git reset --hard origin/master`(将master回退到origin/master，并忽略所有新提交，那些提交保留在feature-git-test分支上)
- `git checkout feature-git-test`(切换到自己的开发分支上，其中就保留了最近的所有工作)
- `git push origin feature-git-test`(将本地分支推至远端)
 

## `git stash`暂存

> 如果当前在分支A开发A任务，突然来了任务B，需要创建一个新的分支开发任务B或者是需要修复紧急bug，这个时候应该怎么做？

1.1 及时commit： 

  在A分支上把已经开发完成的部分代码commit掉，不push，然后切换到B分支修改代码，做完了commit，所有分支互不影响，这是一个理想的方法。

  将A分支的代码commit，这里是commit到了本地仓库，在切换分支的时候，注意一定要在本地切换！！！ 这里如果在远端切换分支，有可能将刚才分支A上做的修改覆盖掉，所以，最好是先将代码push一下。

1.2 使用`git stash`：

  有时候，正在写的代码还不能正常运行，就需要去切换到另一个分支修改bug或者完成其他的任务，如果不想add和commit，可以使用`git stash`：
    
  - 在A分支上`git stash`或者`git stash save “修改的信息"`。这样以后你的代码就回到自己上一个commit了，直接`git stash`的话`git stash`的栈会直接给你一个hash值作为版本的说明，如果用`git stash save “修改的信息”`，`git stash`的栈会把你填写的“修改的信息”作为版本的说明。

  - 接下来你到B分支修改代码完成，你再回到A分支，输入：`git stash pop`或者`git stash list`，`git stash apply stash@{0}`就可以回到保存的版本了。

  - `git stash pop`的作用是将git stash栈中最后一个版本取出来，`git stash apply stash@{0}`的作用是可以指定栈中的一个版本，通过`git stash list`可以看到所有的版本信息：

    ```
    stash@{0}: On order-master-bugfix: 22222
    stash@{1}: On order-master-bugfix: 22222
    ```
    
  - 然后你可以选择一个你需要的版本执行：`git stash apply stash@{0}`， 这时候你搁置的代码就回来了。

  **注意：** `git stash`是针对整个git工程来进行保存的,也就是说区分不了branch。比如我在A分支`git stash save "sss"`暂存了一个修改,那么我切换到B分支,我使用`git stash pop`就能把在a分支保存的"sss"这个修改同步到了b分支上。所以，当我们需要在不同的分支上取出不同的分支上保存的修改,那么就用到了`git stash list`,这个命令可以把在所有分支上暂存的信息显示出来, 然后我们通过`git stash apply stash@{0}`来选择恢复哪个暂存, stash@{0}这个会在list中列出来。
