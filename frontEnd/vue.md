## 缓存

使用 keep-alive， 在 activated 请求新数据使用 v-once

## babel-polyfill

解决低版本浏览器不支持 ES6 语法的问题，如 Array.from Object.assign Array.prototype.includes 等新方法，配合 vuex 使用安装：npm install --save babel-polyfill
引入方式
nodejs 引入：require("babel-polyfill");
ES6 引入：import "babel-polyfill"; vue 中最常用
webpack 配置：module.exports = { entry: ["babel-polyfill", "./app/js"]}

## 异步组件：将应用拆分为多个小模块，按需从服务器下载

```js
webpack 的代码分隔，更常用：
Vue.component('async-webpack-example', function (resolve) {
// 这个特殊的 require 语法告诉 webpack
// 自动将编译后的代码分割成不同的块，
// 这些块将通过 Ajax 请求自动下载。
require(['./my-async-component'], resolve)
})


//ES6:
//需要安装 npm install --save-dev babel-plugin-syntax-dynamic-import
Vue.component(
'async-webpack-example',
() => import('./my-async-component')
)
```

## UI 组件按需引入

1.  装包 npm install babel-plugin-component -D
1.  babel 配置

```js
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime", ["component", {
    "libraryName": "element-ui",
    "styleLibraryName": "~src/style/theme" //自定义主题的css文件路径
  }]]
}
```

1.  按需引入进一步优化

需要的组件在每个页面单独引入 14.9 MB (15,627,331 字节)
需要的组件全局引入 14.8 MB (15,579,441 字节)

结论:全局引入会增大 app.js 的打包体积,所以使用次数较多的组件可以全局引入,否则单独引入

## render 编译模板字符串实现继承 使用 vue 的 mixin

## 刷新路由相同的页面

*   不改变路由参数
    this.$router.go(0)   window.reload()

*  provide inject

```html
//定义
<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
export default {
    name: "app",
    data() {
        return {
            isRouterAlive: true
        };
    },
    provide() {
        return {
            reload: this.reload
        };
    },
    methods: {
        /**
         * 刷新当前页面
         */
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>


//使用
export default{
  inject: ["reload"],
  methods:{
    backService(){
      this.reload()
    }
  }
}
```

*   改变路由参数
    this.$router.push({ name: 'defineAdd' }, () => {
    this.$router.go(0)
    })



## index.html

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <!-- IE使用最新浏览器-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <!-- 360使用webkit-->
  <meta name="renderer" content="webkit">
  <!-- 禁止google翻译-->
  <meta name="google" content="notranslate" />
  <link rel="shortcut icon" type="image/ico" href="/static/favicon.ico" />
  <title></title>
</head>

<body>
  <div id="app"></div>
  <!-- built files will be auto injected -->
</body>

</html>
```

## 定义组件的方式

*   字符串
*   x-template
*   内联模板
*   render 函数
*   compile 函数
*   JSX
*   单文件组件

`/js/template.js`

## 自动注册组件

```js
import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
    // Look for files in the current directory
    ".",
    // Do not look in subdirectories
    false,
    // Only include "_base-" prefixed .vue files
    /_base-[\w-]+\.vue$/
);

// For each matching file name...
requireComponent.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = requireComponent(fileName);
    // Get the PascalCase version of the component name
    const componentName = upperFirst(
        camelCase(
            fileName
                // Remove the "./_" from the beginning
                .replace(/^\.\/_/, "")
                // Remove the file extension from the end
                .replace(/\.\w+$/, "")
        )
    );
    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig);
});
```

## 插件

1.  不同图表切换,用同一数据进行切换

*   https://elemefe.github.io/v-charts/#/toggle
*   echarts4.x 的 dataset 属性

1.  树形组件拖拽

*   已经造好的轮子 https://fe-driver.github.io/vue-beauty/#/components/tree
*   jquery 插件 z-tree

1.  `vue-scroller`列表页进入详情页，或者 tab 页切换，然后再返回列表页，希望能切换到之前滚动位置

需要使用 keep-alive
解决方法一：

```js
beforeRouteEnter(to,from,next){
  if(!sessionStorage.askPositon || from.path == '/'){//当前页面刷新不需要切换位置
    sessionStorage.askPositon = '';
    next();
  }else{
    next(vm => {
        if(vm && vm.$refs.scrollerBottom){//通过vm实例访问this
          setTimeout(function () {
            vm.$refs.scrollerBottom.scrollTo(0, sessionStorage.askPositon, false);
          },0)//同步转异步操作
        }
    })
  }
},
beforeRouteLeave(to,from,next){//记录离开时的位置
  sessionStorage.askPositon = this.$refs.scrollerBottom && this.$refs.scrollerBottom.getPosition() && this.$refs.scrollerBottom.getPosition().top;
  next()
},
```

方法二：改源码(推荐)

```js
this.resizeTimer = setInterval(() => {
    let { width, height } = contentSize();
    if (width !== content_width || height !== content_height) {
        // if (width && height) 为添加判断
        if (width && height) {
            content_width = width;
            content_height = height;
            this.resize();
        }
    }
}, 10);
```

1.  vue-echarts-v3 按需引入

```js
//webpack.base.conf.js
module: {
    rules: [
        {
            test: /vue-echarts-v3.src.*?js$/,
            loader: "babel-loader"
        }
    ];
}
//
import IEcharts from "vue-echarts-v3/src/lite.js";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/title";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataset";
import "echarts/lib/component/tooltip";
import "echarts/theme/walden";
const THEME_LIST = [
    "walden",
    "westeros",
    "roma",
    "dark",
    "infographic",
    "macarons",
    "shine",
    "vintage"
];
export default {
    data() {
        return {
            chartTheme: THEME_LIST[0]
        };
    },
    components: {
        IEcharts
    }
};
```

1.  key 值不同,导致 tab 切换失败  使用index作为key的缺陷是,视图可能不会更新,导致渲染失败

```js
//使用index作为key,导致切换失败
<el-tabs v-model="activeTabName" type="card" @tab-click="tabClick" @tab-remove="removeTabClick" class="tab-main__container-main-tab" ref="tabs">
  <el-tab-pane v-for="(item,index) in tabData" class="tab-main__container-tab-item" :key="index" :label="item.title" :name="item.name" :closable="item.closable">
    <component :is="item.component" :quota-node="item.node" :ref="item.name" v-loading.lock="isPageLoading" element-loading-spinner="el-icon-loading"></component>
  </el-tab-pane>
</el-tabs>
```

```js
//使用name作为key,切换正常
<el-tabs v-model="activeTabName" type="card" @tab-click="tabClick" @tab-remove="removeTabClick" class="tab-main__container-main-tab" ref="tabs">
  <el-tab-pane v-for="item in tabData" class="tab-main__container-tab-item" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable">
    <component :is="item.component" :quota-node="item.node" :ref="item.name" v-loading.lock="isPageLoading" element-loading-spinner="el-icon-loading"></component>
  </el-tab-pane>
</el-tabs>
```

```
function generateUniqueId () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
//如果要强制刷新视图,使用UUID作为key,每次要刷新列表时,给列表赋予新的UUID作为key即可
```

1. Vue插件方式注册全局变量和函数

```js
// methods.js
/**
 * 判断数据类型
 */
function $typeOf(v) {
  return Object.prototype.toString
    .call(v)
    .slice(8, -1)
    .toLowerCase();
}
export { $typeOf};
const install = {};
install.install = Vue => {
  const methods = { $typeOf };
  Object.keys(methods).forEach(key => {
    let value = methods[key];
    Object.defineProperty(Vue.prototype, key, {
      value
    });
  });
};
export default install;


// main.js

import Vue from 'vue'
import methods from './methods'
Vue.use(methods)
// vue 单文件组件中使用     this.$typeOf()
```