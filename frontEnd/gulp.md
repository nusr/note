# gulp

- gulp 本身只提供一个平台，具体任务由插件完成
- 即可同步操作，又可异步操作

## 问题

1.  gulp 同时输出一个压缩和没有压缩的问题

```js
//gulpfile.js
"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var del = require("del");
var DEST = "dist/";
var SOURCE = "script/";
gulp.task("default", function() {
  //删除文件夹里面的文件后,开始压缩
  del(["dist/*"]);
  return (
    gulp
      .src(SOURCE + "*.js")
      // 这会输出一个未压缩过的版本
      .pipe(gulp.dest(DEST))
      // 这会输出一个压缩过的并且重命名未 foo.min.js 的文件
      .pipe(uglify())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest(DEST))
  );
});
```
