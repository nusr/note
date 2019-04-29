# git

**git**是免费开源的版本控制系统，非常高效地处理从小到大的项目。

## 多个账户使用同一个 ssh-key

1.  ssh-keygen
2.  将 public key 分别添加到对应账户
3.  删除 known_hosts 文件
4.  ssh -T git@github.com
5.  ssh -T git@git.coding.net
6.  ssh -T git@gitee.com

## 修改远程仓库

1.  先删后加

```bash
git remote rm origin
git remote add origin [url]
```

1.  直接修改 config 文件

## 同步 fork 项目

1.  查看 `git remote -v`
1.  添加 `git remote add upstream https://github.com/vuejs/vue.git`
1.  拉取 `git fetch upstream`
1.  合并 `git merge upstream/dev`

## git diff

- 比较上次提交 commit 和上上次提交 `git diff HEAD^ HEAD`
- 与最新提交的代码比较 `git diff HEAD`

## 本地分支

- 撤销本地的 commit `git reset HEAD~`
- 删除本地分支 `git branch -D  [branchName]`

## 远程分支

- 获取远程分支 git checkout -b dev origin/dev
- 修改远程分支地址 `git remote set-url origin [NEW_URL]`
- 显示远程分支地址 `git remote -v`
- 删除远程分支 `git push origin --delete [branchName]`
- 使用命令行创建仓库

```bash
git clone https://git.coding.net/stevexucoding/ArmyCollegeLibrary.git
cd ArmyCollegeLibrary
echo "# ArmyCollegeLibrary" >> README.md
git add README.md
git commit -m "first commit"
git push -u origin master
```

- 同步 fork

```
git remote -v
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
git fetch upstream
git checkout master
git merge upstream/master
```

- 本地关联远程仓库
- 
```bash
# or create a new repository on the command line
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:nusr/comic.git
git push -u origin master

# push an existing repository from the command line
git remote add origin git@github.com:nusr/comic.git
git push -u origin master
```

## 配置代理

设置

```
git config --global http.proxy http://proxyuser-name:proxy-password@host:port
```

撤销代理

git config --global --unset http.proxy

查看代理

git config --global --get http.proxy

## gh-pages

## 标签

- 简单标签 `git tag v1.0`
- 附注标签 `git tag -a v1.0 -m 'my version 1.0'`
- 列出所有标签 `git tag`
- 显示标签详内容 `git show [tagname]`
- 推送标签 `git push origin [tagname]`
- 推送所有标签 `git push origin --tags`