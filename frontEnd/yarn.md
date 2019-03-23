# yarn 0.27.5 note #


## 安装yarn

1. `npm install -g yarn`
2. 安装程序

## 初始化

- npm init
- yarn init

## 安装包

- npm install xxx --save
- yarn add xxx

## 移除包

- npm uninstall xxx
- yarn remove xxx

## 更新包

- npm update xxx
- yarn upgrade xxx

## 安装开发依赖包

- npm install xxx --save-dev
- yarn add xxx --dev

## 全局安装

- npm install -g xxx
- yarn global add xxx

## 设置下载源

- npm config set registry url
- yarn config set registry url

## 安装所有依赖

- npm install
- yarn install

## 执行包

- npm run
- yarn run

## 查看包信息

- `yarn info <webpack>`

## npm yarn命令对比


|npm	                                |Yarn|
|---------------------------------------|----|
|npm install	                        |yarn install|
|(N/A)	                                |yarn install --flat|
|(N/A)	                                |yarn install --har|
|(N/A)	                                |yarn install --no-lockfile|
|(N/A)	                                |yarn install --pure-lockfile|
|npm install [package]	                |(N/A)|
|npm install --save [package]	        |yarn add [package]|
|npm install --save-dev [package]	    |yarn add [package] [--dev/-D]|
|(N/A)	                                |yarn add [package] [--peer/-P]|
|npm install --save-optional [package]	|yarn add [package] [--optional/-O]|
|npm install --save-exact [package]	    |yarn add [package] [--exact/-E]|
|(N/A)	                                |yarn add [package] [--tilde/-T]|
|npm install --global [package]	        |yarn global add [package]|
|npm rebuild	                        |yarn install --force|
|npm uninstall [package]	            |(N/A)|
|npm uninstall --save [package]	        |yarn remove [package]|
|npm uninstall --save-dev [package]	    |yarn remove [package]|
|npm uninstall --save-optional [package]|yarn remove [package]|
|npm cache clean	                    |yarn cache clean|
|rm -rf node_modules && npm install	    |yarn upgrade|

