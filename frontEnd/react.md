# react

## state

- setState 改变 state,setState 是异步操作
- 多次进行 setState 会合并
- 调用 setState 后，重新调用 render 方法
- 参数可以是对象或者函数

```js
handleClickOnLikeButton () {
  // 传入函数，达到同步调用的效果
  this.setState((prevState) => {
    return { count: 0 }
  })
  this.setState((prevState) => {
    return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
  })
  this.setState((prevState) => {
    return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
  })
  // 最后的结果是 this.state.count 为 3
}
```

## props

- props 不可变
- 在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 **props** 对象的键值
- 通过 **this.props** 访问
- 提供了默认值 **defaultProps**
- props.children 可以使用插槽
- PropTypes 库 添加 props 类型验证

```js
class LikeButton extends Component {
  static defaultProps = {
    likedText: "取消",
    unlikedText: "点赞"
  }
}
```

## state vs props

- state 是让组件控制自己的状态，props 是让外部对组件自己进行配置
- 尽量少地用 state，尽量多地用 props
- 没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件
- 当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为

```js
// 普通组件
class HelloWorld extends Component {
  constructor() {
    super()
  }
  sayHi() {
    alert("Hello World")
  }
  render() {
    return <div onClick={this.sayHi.bind(this)}>Hello World</div>
  }
}
// 函数式组件
const HelloWorld = (props) => {
  const sayHi = (event) => alert("Hello World")
  return <div onClick={sayHi}>Hello World</div>
}
```

## 组件名称不确定

**false**, **null**, **undefined**, **true** jsx 不做任何渲染。如果要渲染，渲染方式为 `<div>{String(myVariable)}</div>`

1. 判断

```jsx
// null 表示 表达式没有输入
render () {
  const isGoodWord = true
  return (
    <div>
      <h1>
        {isGoodWord
          ? <strong> is good</strong>
          : null
        }
      </h1>
    </div>
  )
}
```

2. 根据 props 的值来确定

```js
import React from "react"
import { PhotoStory, VideoStory } from "./stories"

const components = {
  photo: PhotoStory,
  video: VideoStory
}

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType]
  return <SpecificStory story={props.story} />
}
```

## warning

- **react** 引入操作 **DOM** 的库，[参考](https://reactjs.org/docs/integrating-with-other-libraries.html) 
- 多个相同的组件在一个组件中使用，一定要加上 **key**。不要使用数组索引作为 **key** ,[https://github.com/dylang/shortid](https://github.com/dylang/shortid) 产生友好的 **id** 或者 **UUID**，可以作为 **key**。
> Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components
- 自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头
- 属性名改写: class: className ,for: htmlFor
- **on\*** 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。
- 能不用 ref 就不用

```js
// 自动聚焦
class AutoFocusInput extends Component {
  componentDidMount() {
    this.input.focus()
  }

  render() {
    return <input ref={(input) => (this.input = input)} />
  }
}
```

- 设置动态 HTML ,不转义

```js
render () {
  return (
    <div
      className='editor-wrapper'
      dangerouslySetInnerHTML={{__html: this.state.content}} />
  )
}
```

- 设置 style `<h1 style={{fontSize: '12px', color: this.state.color}}>React.js 小书</h1>`

高阶组件: 传给它一个组件,返回一个新组件的函数
函数式组件: 定义不能使用 state 的组件
Dumb 组件(Pure Component):只会接受 props 并且渲染确定结果的组件

|名称|checkbox,radio|input,textarea|
|-|-|-|
|受控组件|checked|value|
|非受控组件|defaultChecked |defaultValue|



