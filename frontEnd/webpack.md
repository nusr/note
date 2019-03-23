# webpack

https://segmentfault.com/a/1190000006843916

## 核心概念

1.  入口(entry)：图的启动称为入口。可以认为是 app 第一个启动文件
    *   单个入口：`module.exports={entry:'./src/app.js'}`
    *   对象语法：`module.exports ={entry:{app:'./src/app.js',vendors:'./src/vendors.js'}}`
2.  出口(output):控制 webpack 如何向硬盘写入编译文件，只能有一个输出配置
    *   `filename`:输出文件的文件名 `filename:bundle.js`
    *   `path`:目标输出目录 path 的绝对路径 `__dirname + '/dist'`
    *   使用多个入口文件时,应使用占位符 `filename:'[name].js'`
3.  loader:webpack 自身只理解 js,把其他的文件都作为模块来处理,对模块的源代码进行转换
    *   loader 有两个目标
    *   识别出被相应 loader 处理的文件(test 属性)
    *   转换这些文件，使其能够添加到依赖图中(use 属性)
4.  插件(plugins):解决 loader 无法实现的其他事。由于插件可以携带参数/选项，plugins 属性传入 new 实例

## 打包优化

*   externals 避免打包大的第三方依赖
*   dll-plugin 预打包第三方依赖
*   happypack 多进程处理，缓存
*   缓存与增量构建
*   babel-loader?cacheDirectory
*   webpack cache:true
*   减少构建搜索或编译路径 alias resolve
*   具象打包的范围 include exclude
*   svg-sprite https://icomoon.io/

## 问题

1.  去掉生产版本中的 console.log debugger `webpack.prod.conf.js`

```js
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
    },
    sourceMap: true
});
```

1.  全局使用第三方包或者 CDN 引入第三包

```js
new webpack.ProvidePlugin({
   $: 'jquery'
 })

//或者在 webpack.base.conf.js中配置
// externals webpack不会打包该依赖包
// key为包名,value是全局使用的名字
//使用script引入的都要配置该选项
externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios'
}
```

1.  提取公共模块

```js
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
}),

new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: ({ resource }) => (
    resource &&
    resource.indexOf('node_modules') >= 0 &&
    resource.match(/\.js$/)
  ),
}),
```

1.DLL 提取公共代码

```js
// webpack.dll.config.js
const path = require("path");
const webpack = require("webpack");
//提取的代码库
const vendors = [
    "vue/dist/vue.esm.js",
    "echarts",
    "vue-echarts-v3",
    "vuex",
    "axios",
    "file-saver",
    "vue-router",
    "xlsx"
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, "static/js"),
        filename: "[name].dll.js", //[name]的部分由entry的名字替换
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: "[name]_library"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, ".", "[name]-manifest.json"),
            name: "[name]_library",
            context: __dirname
        }),
        // 压缩打包的文件，与该文章主线无关
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
};
```

```js
//在webpack.base.config.js里面配置
const webpack = require("webpack");
module.exports = {
    plugins: [
        //dll提取公共代码
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../vendor-manifest.json")
        })
    ]
};
```

```js
//运行npm run dev 命令前,运行,否则报错
"scripts": {
    "dll": "webpack --config ./webpack.dll.config.js"
}
```

1. webpack.DefinePlugin vs webpack.

- 都是定义全局变量
- DefinePlugin会替换定义的全局变量
- ProvidePlugin全局模式直接使用模块变量

```
//会被替换掉,所以要加 JSON.stringify
new webpack.DefinePlugin({
    DESC:JSON.stringify('This is some text.'),
    IS_DEF:true,
    COUNT:100,
    ARRAY:JSON.stringify([1,2,3]),
    OBJ:JSON.stringify({name:'steve'})
})
// react减少 import React,{Component} from 'react' 引入
new webpack.ProvidePlugin({
    'React':'react'
})
```