# web 存储

*   chrome 的 Application 控制面板

## 分类

1.  localStorage
1.  Session Storage
1.  IndexedDB
1.  Web SQL
1.  Cookies
1.  Cache Storage
1.  Application Cache
1.  Cache-Control
1.  Service Worker

## Application Cache

*   文件总是从缓存取,即使在线
*   只有 manifest 文件更改,缓存文件才会更改

## Service Worker

*   一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。
*   一旦被 install，就永远存在，除非被 uninstall
*   需要的时候可以直接唤醒，不需要的时候自动睡眠（有效利用资源，此处有坑）
*   可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）
*   离线内容开发者可控
*   能向客户端推送消息
*   不能直接操作 DOM
*   出于安全的考虑，必须在 HTTPS 环境下才能工作
*   异步实现，内部大都是通过 Promise 实现

### 作用

1.  ios 阻塞 setInterval 或者 setTimeout
    使用 web worker 解决,同时，多个倒计时不能循环新建多个 worker

```js
//countDown.js
self.onmessage = function(event) {
    var num = event.data;

    var T = setInterval(function() {
        self.postMessage(--num);
        if (num <= 0) {
            clearInterval(T);
            self.close();
        }
    }, 1000);
};
```

```html
<div id="box">60</div>

<script>
var box = document.getElementById('box');
var w = new Worker('countdown.js');
w.postMessage(60);
w.onmessage = function(event){
    box.innerHTML = event.data;
}
</script>
```

1. 离线存储文件  必须是https

```js
//serviceWorkerCache.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorkerCache.js');
}
```


1.  异步读取文件 `http://oss.sheetjs.com/`
