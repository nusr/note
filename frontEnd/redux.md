# redux

## 纯函数

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数
纯函数易测试，易调试

```js
//1. 函数的返回结果只依赖于它的参数

// 不是纯函数
const a = 1
const foo = (b) => a + b
foo(2) // => 3

// 是纯函数
const a = 1
const foo = (x, b) => x + b
foo(1, 2) // => 3
```

```js
//2. 函数执行过程没有副作用,不产生外部可观察的变化
// 产生外部可观察的变化方式有 ，调用DOM API,发送ajax请求，调用window.reload等
// 是纯函数  obj 没有变化
const a = 1
const foo = (obj, b) => {
  return obj.x + b
}
const counter = { x: 1 }
foo(counter, 2) // => 3
counter.x // => 1

// 不是纯函数 外部传入对象 obj 变化了
const a = 1
const foo = (obj, b) => {
  obj.x = 2
  return obj.x + b
}
const counter = { x: 1 }
foo(counter, 2) // => 4
counter.x // => 2

// 是纯函数  obj 是函数内部对象
const foo = (b) => {
  const obj = { x: 1 }
  obj.x = 2
  return obj.x + b
}
```

## dva

## 定义

- namespace - 外部页面调用需要用到
- state   - vuex state  状态值   同步更新才能改变状态值 
- subscription  - 用于收集其他来源的 action,
- effects - vuex actions   异步更新
- reducers 必须是纯函数 - vuex mutations 同步更新 
- call：执行异步函数
- put：发出一个 Action，类似于 dispatch

## 具体操作

- dispatch, 函数 - vuex dispatch 发起操作
- connect, 函数 - 将数据和视图连接在一起

