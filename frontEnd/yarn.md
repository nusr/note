# yarn 0.27.5 note #


## 安装yarn

1. `npm install -g yarn`
2. 安装程序


## 好用命令

- 交互式升级依赖包 `yarn upgrade-interactive --latest`
- 打印包的信息 `yarn info <webpack>`

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

