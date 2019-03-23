## 实时通信

1.  websocket
2.  long-poll 长轮询 二维码扫描

1)  不同域名下通信方式

*   http 请求判断
*   使用 cookie,设置 path,domain
*   使用 url 传值

## url scheme://host.domain:port/path/filename

## 解析 token https://jwt.io/

*   js 库
    1.  https://github.com/kjur/jsrsasign
    2.  https://github.com/square/js-jose
    3.  https://github.com/dgrubelic/vue-authenticate.git
    4.  https://github.com/bnoguchi/everyauth.git
    5.  [parseToken](./js/parseToken.js)

## axios 上传表单数据

```js
//axios会自动解析为表单数据
axios
    .post(
        "/data/importDB?step=2",
        `columnNames=${JSON.stringify(columns)}&sid=${this.tableId}`
    )
    .then(res => {
        //..
    });
```

```
//上传文件
let file = e.target.files[0];
var form = new FormData();
form.append("file", file);
axios.post("/collect/wos/generator/search", form).then(res => {
    console.log(res);
});
```

## 请求缓存器

*   [cache](./js/cache.js)
*   使用

```js
function getHighData(options) {
    let params = {
        url: "/irsindex/solr/achievement/select",
        method: "get"
    };
    return requestData(params, options, axios);
}
```
