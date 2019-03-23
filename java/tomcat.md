# Tomcat

## Tomcat 控制台乱码

修改 **/tomcat/conf/logging.properties** 文件

```
- java.util.logging.ConsoleHandler.encoding = UTF-8
+ java.util.logging.ConsoleHandler.encoding = GBK
```