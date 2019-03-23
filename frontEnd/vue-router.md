# vue-router 2

## 安装

1. script 引入：`<script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>`
1. 模块化开发：

```
npm install vue-router -save

import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

```

## 路径参数

1. `/user/:username` : 使用 this.\$route.params.username
1. `/user?name=steve`: 使用 this.\$route.query.name
1. this.\$route.hash url 中的锚点值
1. 使用`watch`监控路由参数的变化
1. 高级匹配模式: `path-to-regexp`
1. 匹配优先级：当一个路径可以同时匹配多个路由时，谁先定义，谁的优先级最高
