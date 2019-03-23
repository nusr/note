# SSR

- 服务端渲染的优势
    1. 更好的SEO
    1. 更快的内容到达时间
- 缺点
    1. 开发条件受限
    1. 涉及构建设置和更多的部署要求
    1. 更多的服务器负载
- 预渲染：改善少数营销页面的SEO，使用预渲染，webpack中使用`prerender-spa-plugin`来实现

## prerender-spa-plugin

- https://github.com/chrisvfritz/prerender-spa-plugin

## nuxt.js

- 开箱即用 
- https://nuxtjs.org

## 安装

- `npm install vue vue-server-renderer --save`
- 注意
    1. vue-server-renderer 必须和 vue 版本号一样
    2. vue-server-renderer 只能在node.js中使用
- https://ssr.vuejs.org/zh/

## 与纯客户端的区别

1. 禁用响应式数据
2. 生命周期函数只有 beforeCreate和 created,并且不在这两个生命周期函数中设置钩子函数
3. 自定义指令
    - 使用组件代替
    - 使用服务端的 directives
4. `<div id="app" data-server-rendered="true"></div>`  告诉vue以激活模式进行挂载
5. 模板中写入有效的HTML,虚拟DOM无法匹配tbody

## 数据预取

1. 服务器端
2. 客户端
    1. 在路由导航之前解析数据,使用数据加载器
    2. 匹配要渲染的视图后，再获取数据，使用全局mixin

