博客

1. React，React-Native 使用同一个 meteor 后台

[TOC]

[meteor](https://www.meteor.com/) 可以快速构建 pc,移动端，桌面端应用。

最大的优点是：数据库的数据发生变化时，可以实时推送到前端，非常适用于实时展示的应用开发。

在 react,react-native 应用中，可以仅使用同一个 meteor 后台，实时向前端推送数据。


##  metaor 安装


### windows 安装 meteor

官方推荐 [chocolatey](https://chocolatey.org/install) 安装 meteor。

1. 先从 [chocolatey](https://chocolatey.org/install) 安装 chocolatey
2. 然后在命令行中运行 `choco install meteor`

但是 meteor 安装速度非常慢,一顿搜索之后，找到了 Windows 下通过二进制包安装的下载地址 [https://install.meteor.com/windows](https://install.meteor.com/windows),搜索来源 [https://github.com/meteor/docs/blob/version-NEXT/long-form/alternate-windows-installation.md](https://github.com/meteor/docs/blob/version-NEXT/long-form/alternate-windows-installation.md)

### OSX/Linux 安装 meteor

安装非常简单

`curl https://install.meteor.com/ | sh`

### 验证安装

命令行输入 ` meteor --version` 

输出 `Meteor 1.8.1` 表示安装成功

## mongodb 安装



### windows 安装 mongodb

[https://www.mongodb.com/](https://www.mongodb.com/) 下载安装包安装

### OSX 安装 mongodb

`brew install mongod`

**mongod** ,不是 **mongodb**


### mongodb 图形界面

推荐 [https://robomongo.org/](https://robomongo.org/), 可以免费使用。


## meteor DDP

react,react-native 使用同一个 meteor 后台，所以 meteor后台 要与前端应用分开编写。

这就涉及到 meteor 中后台与前端的数据交互,meteor 中定义了一个 **[DDP协议](https://github.com/meteor/meteor/blob/devel/packages/ddp/DDP.md)**。

DDP协议 定义了 meteor 后台发布数据，客户端订阅数据的操作。

本应用使用已经编写好了的 DDP 协议，地址如下： [https://github.com/mondora/ddp.js](https://github.com/mondora/ddp.js)。

## meteor 连接 mongodb

meteor 安装中已经集成了 mongodb。
启动 meteor 时，默认启动的是集成的 mongodb。

### 定义高阶组件


```js
// meteor.js
import DDP from 'ddp.js';
/**
 * meteor 连接选项
 */
const meteorOptions = {
  endpoint: 'ws://localhost:9090/websocket', // react native 中 localhost   要改成本地IP才可以，否则连接失败
  SocketConstructor: WebSocket, // socket 构建函数 WebSocket 或者 SockJS
  reconnectInterval: 10000,//重新连接时间间隔
  autoConnect: true, //  是否自动连接
  autoReconnect: true, // 是否自动重新连接
};
let ddpInstance = null;
/**
 *
 * 获取 ddp 实例
 * @export
 * @returns
 */
export function getDDP() {
  if (!ddpInstance) {
    ddpInstance = new DDP(meteorOptions);
    return ddpInstance;
  }
  return ddpInstance;
}
/**
 *
 * 断开 socket 连接
 * @export
 */
export function disconnectSocket() {
  if (ddpInstance) {
    ddpInstance.disconnect();
  }
}
// mongodb 集合
export const COLLECTIONS_LIST = {
  todo: {
    collectionName: 'todo',
    methodName: 'getAllTodo',
  },
};

```


```js
// MeteorWrapper.js
import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import { notification } from 'antd';
import { getDDP, disconnectSocket } from './meteor';
const PUBLIC_EVENTS = [
  // 'ready',
  // 'nosub',
  'added',
  'changed',
  'removed',
  // 'result',
  // 'updated',
  // 'error',
];
export default (WrapperComponent, { collectionName, methodName }) => {
  class MeteorWrapper extends Component {
    ddp = getDDP();
    recordSubscriptions = {};
    state = {
      meteorList: null,
      initOver: false,
    };
    componentDidMount() {
      if (!this.ddp) {
        console.error('数据推送连接错误');
      }
      // 添加订阅
      this.addSubscription();
    }
    componentWillUnmount() {
      // 取消订阅
      this.removeSubscription();
      // 断开连接
      disconnectSocket();
    }
    // 防止初始化请求次数过多
    @Debounce(600)
    getDataResult() {
      const { ddp } = this;
      const self = this;
      ddp.method(methodName);
      ddp.on('result', data => {
        const { result } = data;
        self.setState({
          meteorList: result,
        });
      });
    }
    componentDidCatch(error, info) {
      console.error(error, info);
    }
    addSubscription() {
      if (!collectionName) {
        console.error('mongodb collection 为空！');
        return;
      }
      const { ddp } = this;
      const self = this;
      // 订阅数据
      self.recordSubscriptions[collectionName] = ddp.sub(collectionName);
      PUBLIC_EVENTS.forEach(event => {
        ddp.on(event, () => {
          self.getDataResult();
        });
      });
      ddp.on('error', msg => {
        notification.error({
          message: '服务器推送数据错误',
          description: `错误消息：${msg}`,
          duration: 10,
        });
      });
      ddp.on('ready', () => {
        self.getDataResult();
        self.setState({
          initOver: true,
        });
      });
    }
    removeSubscription() {
      this.ddp.unsub(this.recordSubscriptions[collectionName]);
    }
    render() {
      return <WrapperComponent {...this.props} {...this.state} />;
    }
  }
  return MeteorWrapper;
};
```

### 使用 meteor

```js
import React from 'react';
import { COLLECTIONS_LIST } from './meteor'
import MeteorWrapper from './MeteorWrapper';

function TestMeteor(props) {
  const {
    meteorList,
    initOver,
  } = props;
  if (!initOver) {
    return <div>加载中...</div>;
  }
  return (
    <div>
      {meteorList.map(item => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}

export default MeteorWrapper(TestMeteor, COLLECTIONS_LIST.todo);
```



```
warning antd > create-react-context > fbjs > core-js@1.2.7: core-js@<2.6.5 is no longer maintained. Please, upgrade to core-js@3 or at least to actual version of core-js@2.
warning dva > react-router-redux@5.0.0-alpha.9: This project is no longer maintained.
warning umi > umi-build-dev > af-webpack > eslint > file-entry-cache > flat-cache > circular-json@0.3.3: CircularJSON is in maintenance only, flatted is its successor.
warning umi-plugin-react > umi-plugin-polyfills > core-js@2.6.0: core-js@<2.6.5 is no longer maintained. Please, upgrade to core-js@3 or at least to actual version of core-js@2.
warning umi-plugin-react > umi-plugin-dva > dva > react-router-redux@5.0.0-alpha.9: This project is no longer maintained.
warning umi-plugin-react > workbox-webpack-plugin > workbox-build > joi@11.4.0: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
warning umi-plugin-react > workbox-webpack-plugin > workbox-build > joi > hoek@4.2.1: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
warning umi-plugin-react > workbox-webpack-plugin > workbox-build > joi > topo > hoek@4.2.1: This version has been deprecated in accordance with the hapi support policy (hapi.im/support). Please upgrade to the latest version to get the best features, bug fixes, and security patches. If you are unable to upgrade at this time, paid support is available for older versions (hapi.im/commercial).
[3/5] 🚚  Fetching packages...
[4/5] 🔗  Linking dependencies...
warning "umi > umi-build-dev > af-webpack > eslint-config-umi > eslint-config-react-app@3.0.8" has incorrect peer dependency "babel-eslint@9.x".
warning "umi-plugin-react > umi-plugin-dva > babel-plugin-dva-hmr@0.4.1" has unmet peer dependency "redbox-react@1.x".
warning "umi-plugin-react > umi-plugin-dva > dva-loading@2.1.0-beta.2" has unmet peer dependency "dva-core@^1.1.0".
```