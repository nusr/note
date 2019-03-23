# vuex

- 专为Vue.js应用程序开发的状态管理模式
- 大型单页面应用适合使用vuex,否则不适合
- 每一个Vuex应用的核心是store(仓库)
- vuex使用单一状态树，用一个对象包含全部的应用层级状态

## vuex与全局对象的区别

- Vuex的状态存储也是响应式的
- 不能直接改变store中的状态,改变状态使用store.commit()

## 状态自管理应用

- state:驱动应用的数据源
- view:以声明方式将state映射到视图
- actions:响应到view上的用户输入导致的状态变化

```js
import Vuex from 'vuex'
const store = new Vuex.Store({...options})
```

## Vuex.Store构造器选项

- state：Vuex store 实例的根state对象
- mutations: 在store上注册mutation
- actions: 在store上注册action
- getters: 只有当它的依赖值发生变化了，才会重新计算
- strict: 是否开启严格模式
- modules: 包含子模块的对象，会被合并到store
- plugins: 一个数组，包含应用在store上的插件方法

## Vuex.Store实例属性

- state:  根状态，只读
- getters：暴露出注册的getter,只读

## Vuex.Store实例方法

- commit()  提交mutation
- dispatch()  分发action
- replaceState(state:Object) 替换store的根状态
- watch(getter: Function, cb: Function, options?: Object) 响应式地监控一个getter方法的返回值
- subscribe(handler: Function) 注册监听store的mutation,通常用于插件
- registerModule() 注册一个动态模块
- unregisterModule() 卸载一个动态模块
- hotUpdate() 热替换新的action和mutation

## 组件绑定的辅助函数

- mapState(map: Array<string> | Object): Object   创建组件的计算属性返回Vuex store中的状态
- mapGetters(map: Array<string> | Object): Object 创建组件的计算属性返回getter的返回值
- mapActions(map: Array<string> | Object): Object 创建组件方法分发action
- mapMutations(map: Array<string> | Object): Object 创建组件方法分发mutation

## mutations

- 更改store的状态唯一的方法就是提交mutations
- 遵守规则
    1. 提前在state中初始化所有所需属性
    1. 在对象上添加新属性时，使用`Vue.set(obj, 'newProp', 123)` 或 `state.obj = {...state.obj, newProp: 123}`
- 使用常量代替mutations事件类型，并放在单独的文件中
- mutation必须是同步函数，异步无法追踪
- 提交：
    1. this.$store.commit('xxx')
    1. store.commit('xxx', {}) 需要在根节点中注入store

## actions

- 类似于mutations,不同在于：
    1. actions提交的是mutation
    1. 可以包含任意异步操作

## mudules

## 表单处理

-  v-model无法使用
- 处理方法
    1. 监听input的change事件
    1. 使用双向绑定的计算属性上

## Vue.use(vuex) ##

- 调用Vue.use(vuex)后，在Vue构造函数中提供store对象，可以将状态从根组件注入到每一个子组件中。子组件可以通过 this.$store访问到
```js
const app = new Vue({
    el: '#app',
    store
});
