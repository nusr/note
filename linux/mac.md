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

```
// 清除文件
xattr -c [filename]
// 清除文件夹
xattr -rc [directory]
```


