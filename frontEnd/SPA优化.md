# SPA 优化

1.  快速启动
    `Promise.all([load('bundle'), load('data')])`

2.  异步组件
    `home:()=>import('@/home/index.vue')`

3.  独立打包公共代码
    DLL

4.  预加载
    boostraper.loadMatch('Page')

5.  ESM 语法,tree-shaking

6.  PWA

7.  动态路由

8.  CDN

9.  nginx 开启 gzip

```
gzip  on;
gzip_comp_level 4;
gzip_buffers  4 16k;
gzip_types text/javascript text/plain text/css text/xml application/javascript application/x-javascript application/xml  application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
#gzip_min_length 1k;
gzip_http_version 1.1;
```

10. 文件分离

- css @import
- js mixins
- extends

11. 组件通信

- 父组件向子组件传值 props
- 子组件向父组件传值 emit
- 非父组件通信 vuex
- 祖先组件向子组件传值 provide inject

12. 性能优化

13. 代码规范 eslint

14. 测试

15. 接口
