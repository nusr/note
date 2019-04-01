# js

## 本地数据库

[本地数据库](./js/dataBas.js)

## 问题

1.  ~~运算符

    > > 类型转换，将其他类型转换为数字类型

1.  访问 null 或者 undefined 的属性报错

```js
let t;
t.a; // 访问undefined的属性为报错
```

1.  拷贝

*   对象 `Object.assign({}, srcObj)` 这是浅拷贝
*   数组 `[].slice(arr)` 浅拷贝
*   对象或数组 `var cloneObj = JSON.parse(JSON.stringify(obj))` 不能存在循环引用 不能拷贝函数
*   递归
*   jQuery
*   lodash

```
// 递归

function deepClone (obj) {
  if ($typeOf(obj) === "array") {
    return obj.map(deepClone)
  } else if ($typeOf(obj) === "object") {
    var cloned = {}
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}
//jQeury
function $deepClone(value) {
    if ($typeOf(value) === "array") {
        return jQuery.extend(true, [], value);
    } else if ($typeOf(value) === "object") {
        return jQuery.extend(true, {}, value);
    } else {
        return value;
    }
}
function $typeOf(v) {
    return Object.prototype.toString
        .call(v)
        .slice(8, -1)
        .toLowerCase();
}
//lodash
_.cloneDeep(arr1); // Lo-dash
```
1.  UUID (Universally Unique IDentifier) 全局唯一标识符
    http://blog.csdn.net/mr_raptor/article/details/52280753

```js
function generateUniqueId() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
    );
}
```

1.  md5 使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
	<script src="https://cdn.jsdelivr.net/npm/node-forge@0.7.0/dist/forge.min.js"></script>
    <script>
        let md = forge.md.md5.create();
        md.update('The quick brown fox jumps over the lazy dog');
        console.log(md.digest().toHex());
		//9e107d9d372bb6826bd81d3542a419d6
    </script>
</body>
</html>
```

1.  js 异步加载

*   `<script src="./vue.js" defer></script>` 渲染完再执行,一个 html 文件不要使用多次
*   `<script src="./vue.js" async></script>` 下载完就执行
*   `<script src="./vue.js" type="module"></script>` ES6 模块加载，相当于添加 defer 属性 ，模块中可以使用 import ,export

1.  禁止网站内容复制

方法一：

```js
<script>
    // oncontextmenu 事件在元素中用户右击鼠标时触发并打开上下文菜单
    document.oncontextmenu=new Function("event.returnValue=false"); //
    onselectstart几乎可以用于所有对象，其触发时间为目标对象被开始选中时（即选中动作刚开始，尚未实质性被选中）
    document.onselectstart=new Function("event.returnValue=false");
</script>
```

方法二：

```js
 <body oncontextmenu="return false" onselectstart="return false">
或
<body oncontextmenu="event.returnValue=false" onselectstart="event.returnValue=false">
```

当 body 的内容较少时，可以从下往上选中复制方法三：只禁止复制

```js
<body oncopy="alert('对不起，禁止复制！');return false;">
```

方法四：禁止 ctrl+c ctrl+v

```js
// 禁用Ctrl+C和Ctrl+V（所有浏览器均支持）
$(document).keydown(function(e) {
    if (e.ctrlKey && (e.keyCode == 86 || e.keyCode == 67)) {
        return false;
    }
});
```

http://www.qdfuns.com/notes/23906/84dc93538bc897d609bf827277405c3c.html
以上方法，点击 F12 后均无效，，

1.浏览器右键默认事件

```
document.oncontextmenu = function(){
　　return false;
}
```


2.  实际使用的缓存方式

*   http 缓存,设置 cache-control
*   localStorage
*   cookie
*   ServiceWorkers 兼容性较差
*   使用 CDN

http://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/

2.  离线缓存
    http://www.zhangxinxu.com/wordpress/2017/07/service-worker-cachestorage-offline-develop/

3.  window.self 全局对象 self 全局作用域

```
window === self ;//
window.window === window.self
window.self === self
window.window === self
```

在 Service Workers,Web Workers 中，不能使用 window 对象，但是可以使用 self 对象

4.  `$ is not a function`

其他库里面使用$,与 jquery 冲突了

5.  编码 js 表达式 `/js/encode.html`


1. textarea切分换行符 

```js
let value = `测试 丑 动物 第二 孺子 牛 
测试  肥皂 塑像 秃鹫 杨过 雕`;
let splitResult = [];
let arr = value.split(/\r?\n/gi);
arr.forEach(item => {
    let value = item.split(/\s/gi);
    splitResult.push(value.map(item => item.trim()));
});
```

1. 前端读取文本文件,其他文本的读取与json文件类似

```
//
<input id="read-json" type="file">
<script>
    document.querySelector('#read-json').onchange = function (event) {
        let files = event.target.files
        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function (event) {
            let result = event.currentTarget.result;
            let json
            try {
                json = JSON.parse(result);
            } catch (error) {
                console.error(`该文件中的json不符合标准!`)
            }
            console.log(json)
        };
    }
</script>
```

1. top 10 js errors
    - ` Uncaught TypeError: Cannot read property`  fix: 初始化提供默认值
    - ` TypeError: ‘undefined’ is not an object (evaluating` safari特有  解决方法如上
    - `TypeError: null is not an object (evaluating` fix:事件监听
    - ` (unknown): Script error`  fix:`location ~ ^/assets/ {add_header Access-Control-Allow-Origin *;}` `<script crossorigin="anonymous"></script>`
    - `TypeError: Object doesn’t support property` IE兼容性
    - `TypeError: ‘undefined’ is not a function`\
    - `Uncaught RangeError: Maximum call stack`
    - `TypeError: Cannot read property ‘length’`
    - `Uncaught TypeError: Cannot set property`
    - `ReferenceError: event is not defined`


1. debounce vs throttle

- debounce (去抖)把触发非常频繁的事件（比如按键）合并成一次执行
- throttle (节流) 保证每 X 毫秒恒定的执行次数，比如每200ms检查下滚动位置，并触发 CSS 动画
- requestAnimationFrame：可替代 throttle ，函数需要重新计算和渲染屏幕上的元素时，想保证动画或变化的平滑性，可以用它。注意：IE9 不支持。

1. 创建 pure object ,即不从 `Object` 中继承任何属性和方法 

`const pureObject = Object.create(null)`

1. 格式化json输出

```js
const obj = {a:1,b:3};
JSON.stringify(obj,null,4); // 4个空格缩进
```

1. 平铺多维数组

```js
function flattenArray(arr){
    const flattened = [].concat(...arr);
    return flattened.some(item => Array.isArray(item)) ? flattenArray(flattened) : flattened;
}
```

1. js获取网关ip

```js
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script type="text/javascript">  
    document.write(JSON.stringify(returnCitySN))
   // {"cip":"119.96.120.52","cid":"420100","cname":"湖北省武汉市"}
</script>
```

1. word 转换为 html

html to doc  **./js/jquery.wordexport.js**
html to docx https://github.com/evidenceprime/html-docx-js

1. html 转换为 mobi

使用 js 获取页面链接，使用 **calibre** 的 **ebook-convert** 工具，**cmd** 运行 `ebook-convert ./windows/kindle.recipe deepLearning.mobi  --output-profile kindle`,即可得到 **mobi** 文件

1. 观察者模式

**./js/observe.js**

1. **===** 的缺陷

如果 id 为数字类型，从 DOM 上获取该值时，会转换为字符串类型
```js
let temp = `<div data-id="${id}" id="root"></div>`
let value = document.getElementById('root').getAttribute('data-id')
```

1. **||** 进行运算的缺陷

```js
function getValue(t){
    return t || 1
}
console.log(getValue()) // 1
console.log(getValue(0)) // 1 错误
console.log(getValue(1)) // 1
console.log(getValue(-1)) // -1
```