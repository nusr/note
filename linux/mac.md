# mac

## 切换点开头文件的显示掩藏

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

## wine 

1. 下载 xquartz https://www.xquartz.org/ 安装 ，配置
2. 下载 wine https://wiki.winehq.org/Download_zhcn  
3. 说明 https://wiki.winehq.org/MacOS/Building

```
 Welcome to wine-4.0.

 In order to start a program:
   .exe: wine program.exe
   .msi: wine msiexec /i program.msi

 If you want to configure wine:
   winecfg

 To get information about app compatibility:
   appdb Program Name

```