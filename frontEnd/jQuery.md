# jQuery

- javascript库
- write less,do more
- 体积小
- 链式编程
- 隐式迭代

## 顶级对象

- $
- jQuery
- $ === jQuery

## 加载事件

```js
//js原生窗体事件，外部文件全部加载完后才支持js代码
window.onload = function(){alert("window.onload")};
//jQuery加载方式
//1 不同于window.onload,$(window).load()可多次加载
$(window).load(function(){alert("$(window).load()")});
//2 加载完标签就执行js代码，可多次加载
 $(document).ready(alert("$(document).ready()1"));
jQuery(document).ready(alert("jQuery(document).ready()1"));
//3 与第2种相同
$(function () {
    alert("$");
});//这种最常用
jQuery(function () {
     alert("jQuery");
 });
```

## 添加jQuery库

- 下载后添加

```html
<head>
    <script type="text/javascript" src=
    "jquery.js"></script>
</head>
```

- 不下载添加,加载更快

```html
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs
/jquery/1.4.0/jquery.min.js"></script>
</head>
```

```html
<head>
<script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery
/jquery-1.4.min.js"></script>
</head>
```


## 对象转换

- DOM对象转换为jQuery对象:$(domObj);
- jQuery对象转换我DOM对象:$(jqueryObj).get(0);或$(jqueryObj)[0];
- jQuery对象是一个伪数组

## 基础语法

- $(selector).action();
- 美元符号定义jQuery
- 选择符查询和查找HTML元素
- action()执行对元素的操作

## jQuery选择器

- css1~css3中的选择器，jQuery都可以获取
- 基本
    - #id
    - element
    - .class
    - *
    - selector1,selector2,...selectorN
- 层级
    - ancestor descendant
    - parent>child
    - prev+next
    - pre~siblings;匹配pre之后的所有同辈siblings

## 效果

#### 掩藏/显示

- show(speed,easing,fn);//显示speed可以为"slow","normal","fast",也可以为数字，表示毫秒，easing指定切换效果，第三个参数为回调函数
- hide();//掩藏
- toggle();//显示或掩藏

#### 淡入淡出

- fadeIn();//淡入
- fadeOut();//淡出
- fadeToggle();//淡入或淡出
- fadeTo();//设置透明度

#### 滑动

- slideDown();//下滑，即显示
- slideUp();//上滑，即掩藏
- slideToggle();//上滑或下滑

#### 动画

- animate(params,speed,easing,fn);//params为属性键值对

## HTML

#### 获取

- text();//不传入参数表示获取标签文本内容，否则设置文本内容
- html();//不传入参数表示获取标签innerHTML，否则设置标签innerHTML
- val();//不传入参数表示获取表单元素的value值，否则设置表单的value值
- attr();//只传入一个参数，则获取元素该参数对应的属性值；若传入两个参数，则为相应的属性设置属性值，也可以传入键值对
- prop:设置属性值为固定值的属性

#### 添加

- append(元素内容或对象);//往元素最后添加，添加的是子元素;如果已经存在于页面中，则会移动到新位置
- appendTo(对象);//将元素添加到某对象
- prepend(元素内容或对象);//往元素最前面开始添加，添加的是子元素
- after(元素内容或对象);//在当前元素之后添加，添加的是兄弟元素
- before(元素内容或对象);//在当前元素之前添加，添加的是兄弟元素
- clone(bool);//复制元素，默认深层复制，传入true则连事件一起复制，否则只复制HTML内容

#### 删除

- remove();//从页面结构中删除元素
- empty();//清空元素的内容

#### 表单

- :checkbox

## CSS

#### 样式

- css();//传入属性名表示获取属性值，传入键值对表示设置属性
- addClass("className1 className2");//添加类选择器，可以一下添加很多样式
- removeClass("className1 className2");//不传入参数则删除该元素的所有类选择器
- toggleClass("className1 className2");//添加或删除类名，
- hasClass("className1 className2");//判断是否设置了类

#### 位置

- offset({left:num,top:num2});//不传入参数表示获取offsetLeft,offsetTop

#### 尺寸

- heigth(val,fn);//val为设置的高度值,fn为回调函数，不传入参数，则获取高度，单位默认是px,所以传入为数值
- width(val,fn);//获取当前元素的宽度
- innerWidth();获取当前元素的宽度+padding
- outerWidth();//获取当前元素的宽度+padding+border
- outerWidth(true);////获取当前元素的宽度+padding+border+margin

## 遍历

#### 树遍历

- 向上
    * parent()
    * parents()
    * parentsUnitl()
- 向下
    - children();直接子元素
    - find();
- 水平
    - siblings();//获取当前元素的所有兄弟节点
    - next();//获取当前元素的下一个兄弟节点
    - nextAll();//获取当前元素后面的所有兄弟节点
    - prev();//获取当前元素的上一个兄弟节点
    - prevAll();//获取当前元素的所有前面的兄弟节点
- 过滤
    - :first()
    - :last()
    - :eq()
    - :filter()
    - :not()

#### 显示遍历

- each();

## 创建元素

- DOM
    1. document.write();
    2. document.createElement();
    3. innerHTML
- jQuery
    1. $(元素代码);
    2.对象.html(元素代码);

## 绑定事件；

- bind({"click":function(){}});//绑定多个事件
- 父元素.delegate(子元素，事件类型，function(){});//给未元素指定事件，父元素调用，给子元素绑定事件
- 父元素.on(事件类型，子元素，事件处理函数);//父元素调用，给子元素绑定事件，推荐使用

## 解绑事件

- unbind()
- undelegate()
- off()

## 事件委托

## 触发事件

1. $(jObj).click()
2. $(jObj).trigger("click");//第一种和第二种触发事件的方式是相同的，都会触发浏览器的默认事件，如a标签跳转，光标在文本框中获得焦点，
3. $(jObj).triggerHandler("click");//不会触发浏览器的默认事件

## 取消冒泡和浏览器默认行为

- return false;//写在函数最后

#### 其他

- stop();//停止所有在指定元素上正在运行的动画
- Callback函数:函数在当前动画100%完成之后执行
- chaining技术：在相同的元素上执行多个方法
- ready：文档就绪函数，加载完标签才执行js代码
- load:窗体事件，加载完全部外部文件后才执行js代码
- mouseover mouseenter 鼠标悬浮在所选元素上时，就能触发mouseover ;若鼠标穿过被选元素，就能触发mouseenter
- var xy = $.noConflict();//多库共存,xy === jQuery
- end();//回到最近的一个断链操作之前


## AJAX

- load()方法
- get()
- post()

## Ajax事件

1. ajaxStart(cb)
2. ajaxStop(cb)
3. ajaxComplete(cb)
4. ajaxSend(cb)
5. ajaxSuccess(cb)
6. ajaxError(cb)
7. 监控ajax请求状态，ajaxStart,ajaxStop无论发送多少次请求，都只会发生一次；而其他事件，发送几次ajax请求，就触发几次

## jQuery自定义事件

- 通过`on`和`one`绑定，然后再通过`trigger`来触发这个事件
- 通过`one`绑定的事件，会在触发后，将其删除
- 通过`triggerHandler`()方法，不会触发浏览器的默认行为
- 三种情况
    - 用户提交空值
    - 用户提交用户名不存在
    - 用户提交用户名存在

```js
// 自定义事件
$('#username').on('black.username', function () {
    console.log('请不要留空');
});
$('#username').on('notExist.username', function () {
    console.log('用户名不存在');
});
$('#username').on('success.username', function () {
    console.log('用户名存在');
});
// 触发自定义事件
$('.js-submit').on('click', function () {
    var username = $('#username').val();
    username = $.trim(username);
    if(username === '') {
        $('#username').trigger('black.username');
    } 
    $.post(url, {usrname: username}, function (data) {
        var res = data;
        if(res.retcode === -1) {
            $('#username').trigger('notExist.username') 
        }
        else if ( res.retcode === 0) {
            $('#username').trigger('success.username');
        }
    })
})
```

# jQuery mobile

## 移动端浏览器事件 ##

1. 触摸事件：当用户触摸屏幕时触发，可用在PC上
2. 滑动事件：当用户上下滑动时触发
3. 定位事件：当设备水平或垂直翻转时触发
4. 页面事件：当页面显示，掩藏，创建，加载或未加载时触发



