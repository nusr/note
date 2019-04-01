# mac

## 切换点开头文件的显示掩藏

显示隐藏文件:defaults write com.apple.finder AppleShowAllFiles Yes && killall Finder
不显示隐藏文件:defaults write com.apple.finder AppleShowAllFiles NO && killall Finder

## chrome

检查 Cmd + Opt + I

## 文件夹不被 spotlight 索引

在该文件夹下添加 `.metadata_never_index` 文件
`npm install spotlight-never-index --global`