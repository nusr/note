# express

- node.js框架
- 本质上，一个express应用就是在调用各种中间件

## 中间件

- 中间件(middleware)就是一个函数
- 功能包括
    1. 执行任何代码
    1. 修改请求和响应对象
    1. 终结请求-响应循环
    1. 调用堆栈中下一个中间件

### 分类

1. 应用级中间件
    - 中间件绑定到app对象使用app.use()或app.METHOD()
1. 路由级中间件
1. 错误处理中间件
1. 内置中间件
1. 第三方中间件

## 获取参数

- 获取restfulAPI中的参数：  req.params.id;
- 获取?callback=cb这种参数: req.query.callback;

## API

1. express()
    express.static(root,[options]);// root指静态资源文件所在的目录
2. app
    - app.METHOD(path,callback[,callback...]) app.param([name],callback) 进行http请求 METHOD指http请求方法
    - app.post(path,callback[,callback...])
    - app.delete(path,callback[,callback...])
    - app.put(path,callback[,callback...])
    - app.get(path,callback[,callback...])
    - app.set(name,value)
    - app.use([path,] function[,function...])
    - app.engine(ext,callback) 注册模板引擎
    - app.render(view,[locals],callback)  渲染html视图
    - app.route(path) 配置中间件
3. request
4. response
5. router

```js
const express = require('express');
const app = express();
const router = express.Router([options])
```

## Express-generator

- 快速创建一个应用的骨架
- 安装 `npm install express-generator -g`
- 初始化目录：`express myapp`
- 安装依赖：`npm i`
- 启动应用
    - Mac or Linux: `DEBUG=myapp npm start`
    - Windows:`SET DEBUG=expressgenerator:* & npm start`
