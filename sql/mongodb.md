# mongoDB

## 安装

- 下载 https://www.mongodb.com/download-center/community
- 选择 **complete** 安装
- 添加环境变量 **C:\Program Files\MongoDB\Server\4.0\bin**


## 启动

- 指定数据文件夹 cd 到 **C:\Program Files\MongoDB\Server\4.0\bin** 运行 `mongod --dbpath=D:\mongodb\data --logpath=D:\mongodb\logs\log.log`
- 启动服务 `net start MongoDB`
- 启动 mongodb `mongo`  or 指定mongodb `mongo mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]`
- 终止服务 `net stop MongoDB`
- 连接mongoDB后，添加用户名和密码

```
use admin
db.createUser(
   {
     user: "root",
     pwd: "123456",
     roles: [ { role: "readWrite", db: "reporting" } ],
     mechanisms: [ "SCRAM-SHA-1" ]
   }
)
```