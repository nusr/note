 /*
实现CMS后台管理接口
 */
const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require('body-parser');
// 静态资源管理
app.use('/www', express.static('public'))
// 参数处理
app.use(bodyParser.urlencoded({ extended: false }))
// 路由处理
app.use(router);
app.listen(3000, "localhost", () => {
    console.log('running...');
});
