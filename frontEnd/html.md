## DOM

1.  `window.opener` 返回打开当前窗口的那个窗口的引用.
1.  编辑 HTML

- contenteditable 属性，属性值为 true,false,inhreit
- user-modify
- js 控制

## 问题

1.  IE10/11 不再支持条件注释

> > 解决方法一:以 IE9 的模式渲染 `<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">`
> > 解决方法三:仅 IE10/11 支持的媒体查询 `-ms-high-contrast`

```
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
/* IE10+ CSS styles go here */
}
```

> > 解决方法三:js 判断

```js
var ms_ie = false;
var ua = window.navigator.userAgent;
var old_ie = ua.indexOf("MSIE ");
var new_ie = ua.indexOf("Trident/");

if (old_ie > -1 || new_ie > -1) {
  ms_ie = true;
}

if (ms_ie) {
  document.documentElement.className += " ie";
}
```

1.  `onerror`事件，js 原生事件

    > > onerror 事件会在文档或图像加载过程中发生错误时被触发。在装载文档或图像的过程中如果发生了错误，就会调用该事件。

1.  下载文件

> > 使用 a 标签或者动态创建 a 标签 导出 download 属性表示文件直接下载

```
<button type="button"  onclick="download()">导出</button>
function download() {
    let Link = document.createElement('a')
    Link.href = url
    Link.download = fileName
    document.body.appendChild(Link)
    Link.click()
    document.body.removeChild(Link)
 }
```

> > 使用 form 表单

```
// url 请求地址 String
// params 请求参数 Object
function $downloadStaticFile (url, params) {
  let formHTML = [
    `<form action="${url}" method="get" target="_blank" id="download-form"> </form>`,
    Object.entries(params)
      .map(
        ([field, value]) =>
          `<input type="text" name="${field}" value="${value}" />`
      )
      .join(''),
    '</form>'
  ].join('')
  $(formHTML)
    .appendTo('body')
    .submit()
    .remove()
}
```

[xlsx 导出 excel 文件](./js/exportExcel.js)

[html-docx-js 导出 docx 文件](./js/exportDocs.js)

1.  form 里面只有一个 input 时,在 input 里面回车刷新页面

```
<el-form >
   <el-form-item>
      <el-input v-model="form.username" placeholder="请输入用户名" @keyup.enter.prevent="onSubmit"></el-input>
    </el-form-item>
   <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
   </el-form-item>
</el-form>
```

> > 方法一:这是 form 标签的默认行为，在 <el-form> 标签上加 @submit.native.prevent 就行

> > 方法二:添加掩藏 input

1. input=file 无法多次上传同一文件

```
//上传一次文件后,浏览器会记录该文件
<input id="input"  type="file" accept=".xlsx,.xls" />

//每次上传后,清空input,即可多次上传
document.getElementById('input').value = ''

```

1. ## IE 的兼容处理

```
<!-- 清除浮动的兼容 -->
.clearfix::after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    clear: both;
    visibility: hidden;
}
<!-- IE6下还要添加下面一段 -->
.clearfix {
    zoom: 1;/*为了兼容ie6*/
}
```

```
<!-- 设置透明度的兼容 -->
opacity:0.5px;
<!-- IE6下使用 -->
filter:Alpha(opacity=50);
```

```html
<!-- ie9以下不能使用第二句，但能使用第一句 -->
background: gray;/*优雅降级*/ background: rgba(0, 0, 0, 0.3);
```
