# node

## 环境变量

*   `cross-env NODE_ENV=test node app`

## semver 格式：主版本号.次版本号.修订号。版本号递增规则如下：

主版本号：做了不兼容的 API 修改次版本号：做了向下兼容的功能性新增修订号：做了向下兼容的 bug 修正

## 问题

1.  使用 npm install 安装包时报错，卸载了 nodejs 重新安装，依然报错

> > 解决：文件系统为 FAT32，改为 NTFS，就可以安装包，不会报错了

1.  图片下载

    > > https://linghucong.js.org/2016/08/06/nodejs-batch-download-images-with-async-and-bagpipe/

1.  多版本安装

    *   https://github.com/tj/n
    *   https://github.com/creationix/nvm

1.  nginx 改写请求路径时,要使用 IP,不能使用域名,否则导致改写请求路径失败

1. 递归删除文件

```js
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      const curPath = `${path}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
deleteFolderRecursive('./dist')
  
1. 执行命令行命令,无需引入任何第三方包
  
```js
const { exec, execSync } = require("child_process")
//异步执行
exec(`tsc test.ts`, (error, stdout, stderr) => {
  if (error) {
    console.error(error)
    return
  }
})
//同步执行
execSync('npm run build')
```
