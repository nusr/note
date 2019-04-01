# npm

*   nodejs package manager
*   A package in Node.js contains all the files you need for a module.
    Modules are JavaScript libraries you can include in your project.

## 基本命令

### 全局安装

*   不指定版本时,安装最新版本
*   全局安装：npm install -g <express>
*   查看全局安装模块:npm list -g
*   使用淘宝镜像：$ npm install -g cnpm --registry=https://registry.npm.taobao.org
*   卸载：npm uninstall -g 包名
*   更新：npm update -g 包名

### 本地安装

*   本地安装：`npm install <express>@版本号` 简写 `npm i <express>@版本号`
*   本地安装目录 C:\Program Files\nodejs\node_modules\npm，可以使用 requirey()引入本地安装的包
*   查看某个模块版本号:npm list <express>
*   列举安装的模块：npm ls
*   卸载模块:npm uninstall <express>
*   安装 package.json 中所有模板:npm install
*   卸载 package.json 中所有模块:npm uninstall
*   更新模块:npm update <express>
*   搜索模块:npm search <express>
*   查看帮助:npm help

## npm 翻墙

1.  设置：npm config set registry=https://registry.npm.taobao.org 查看：npm config get registry
    1, npm install -g cnpm --registry=https://registry.npm.taobao.org
1.  npm install -g nrm

## 命令简写

*   `install`:`s`
*   `global`:`-g`

## 好用工具

*   npm 下载源设置： `npm install -g nrm`
*   编译 less 文件: `npm install -g less`
*   安装 nodejs 多个版本: `nvm`
*   小型服务器： `cnpm install -g http-server`
    *   使用:`http-server -o index.html` or `http-server-server -o`
    *   简写:`hs -o`
*   将 markdown 文件编译成树形 html 文件
    *   安装：`cnpm i -g i5ting_toc`
    *   编译：`i5ting_toc -f README.md -o`
*   npm-check 升级所有依赖包
*   npm
*   nrm 切换镜像源
*   nvm 切换 nodejs 版本

## 自定义包

*   package.json 必须在包的顶层目录下
*   二进制文件应该在 bin 目录 下
*   js 应该在 lib 目录下
*   文档应该在 doc 目录下
*   单元测试应该在 test 目录下

### package.json

*   name:包名，必须唯一
*   description:简要说明
*   version:语义化版本
*   keywords:关键字数组
*   maintainers: 维护者
*   contributors:贡献者
*   bugs: 提交 bug 地址
*   licenses:
*   repositories: 仓库地址
*   dependencies: 生产环境依赖包
*   devDependencies:开发环境依赖包


## bug

- 装包错误

`npm cache clean --force`

```
D:\work>npm i -g dawn --registry=https://registry.npm.taobao.org
npm WARN deprecated leftpad@0.0.1: Use the built-in String.padStart function instead
npm WARN deprecated coffee-script@1.12.7: CoffeeScript on NPM has moved to "coffeescript" (no hyphen)
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: clone@1.0.4 (node_modules\dawn\node_modules\clone):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'

npm ERR! path C:\Program Files\nodejs\node_modules\.staging
npm ERR! code EPERM
npm ERR! errno -4048
npm ERR! syscall mkdir
npm ERR! Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
npm ERR!  { [Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging']
npm ERR!   cause:
npm ERR!    { Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
npm ERR!      errno: -4048,
npm ERR!      code: 'EPERM',
npm ERR!      syscall: 'mkdir',
npm ERR!      path: 'C:\\Program Files\\nodejs\\node_modules\\.staging' },
npm ERR!   stack:
npm ERR!    'Error: EPERM: operation not permitted, mkdir \'C:\\Program Files\\nodejs\\node_modules\\.staging\'',
npm ERR!   errno: -4048,
npm ERR!   code: 'EPERM',
npm ERR!   syscall: 'mkdir',
npm ERR!   path: 'C:\\Program Files\\nodejs\\node_modules\\.staging',
npm ERR!   parent: 'dawn' }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It's possible that the file was already in use (by a text editor or antivirus),
npm ERR! or that you lack permissions to access it.
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator (though this is not recommended).

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\admin\AppData\Roaming\npm-cache\_logs\2019-02-14T01_12_16_261Z-debug.log
```

- 无权限

管理员模式启动 cmd ,然后装包

```
54 error syscall mkdir
55 error Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
55 error  { [Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging']
55 error   cause:
55 error    { Error: EPERM: operation not permitted, mkdir 'C:\Program Files\nodejs\node_modules\.staging'
55 error      errno: -4048,
55 error      code: 'EPERM',
55 error      syscall: 'mkdir',
55 error      path: 'C:\\Program Files\\nodejs\\node_modules\\.staging' },
55 error   stack:
55 error    'Error: EPERM: operation not permitted, mkdir \'C:\\Program Files\\nodejs\\node_modules\\.staging\'',
55 error   errno: -4048,
55 error   code: 'EPERM',
55 error   syscall: 'mkdir',
55 error   path: 'C:\\Program Files\\nodejs\\node_modules\\.staging' }
56 error The operation was rejected by your operating system.
56 error It's possible that the file was already in use (by a text editor or antivirus),
56 error or that you lack permissions to access it.

```

- 查看全局安装的依赖包 `npm list -g --depth 0` or `yarn global list --depth=0`

`./js/globalPackage.txt`