# mac

[TOC]

## 切换点开头文件的显示掩藏
z
显示隐藏文件:defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
不显示隐藏文件:defaults write com.apple.finder AppleShowAllFiles NO && killall Finder

## chrome

检查 Cmd + Opt + I

## 文件夹不被 spotlight 索引

在该文件夹下添加 `.metadata_never_index` 文件
`npm install spotlight-never-index --global`

## **无线诊断** 诊断 wifi

## mac 外接显示器，关闭本机显示器

1. 选择**镜像显示器**
2. 本机显示器亮度调至最暗。

## brew 使用代理

`ALL_PROXY=socks5://127.0.0.1:1086 brew update`

`ALL_PROXY=socks5://127.0.0.1:1086 brew install gradle`

## 清除扩展属性

解决双击 html 文件，无法在浏览器打开的问题

```bash
// 清除文件
xattr -c [filename]
// 清除文件夹
xattr -rc [directory]
```

## 命令行打开文本编辑

使用：open -a TextEdit settings.xml 参数说明：－a指定应用

open -e settings.xml 参数说明：－e使用文本编辑器打开

open -t settings.xml 参数说明：－t使用默认编辑器打开

## curl 下载文件

```bash
curl -o test.mp4 http://youtube.com/aa.mp4
```

配置代理

```bash
curl --proxy socks5://127.0.0.1:1086 -o test.mp4 http://youtube.com/aa.mp4
```

## Alias

```bash
# javascript

alias nis="npm i --save"
alias nid="npm i --save-dev"
alias nig="npm i -g"
alias ns="npm run start"
alias nt="npm run test"
alias nb="npm run build"
alias yuil="yarn upgrade-interactive --latest"
alias ncu="npm-check -u"

# git

alias gcb="git checkout -b"
alias gpom="git push origin master"
alias gpomf="git push origin master --force"
alias gpof="git push origin --force"

# trash-cli

alias tp="trash-put"
alias tl="trash-list"
```