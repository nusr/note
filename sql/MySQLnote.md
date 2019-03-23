# MySQL

## MySQl 分类

1. Community Edition：社区开源版本，免费；
1. Standard Edition：标准版；
1. Enterprise Edition：企业版；
1. Cluster Carrier Grade Edition：集群版。

## 安装 MySQL

1. `D:\mysql-8.0.12-winx64\bin`文件夹下以管理员身份执行以下命令
1. 初始化 `mysqld --initialize --console`
1. 安装服务 `mysqld --install [服务名,默认mysql]`
1. 更改密码 `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';`

## MySQL 操作

- 启动: net start MySQL57 **#**(MySQL 服务名）
- 停止: net stop MySQL57 **#**(MySQL 服务名）
- 卸载: sc delete MySQL57d **#**(MySQL 服务名）
- 登录:mysql [-h MySQL 服务名] -u 用户名 -p
  mysql -u root -p
- 设置密码：

```
set password=password('7241314');
flush privileges;
```

- 退出:\q，exit,quit
- 创建一个数据库:
  create database 数据库名 [其他选项];
- 查看数据库：
  show database;
- 选择数据库： - mysql -D 所选择的数据库名 -h 主机名 -u 用户名 -p - use 数据库名;
- 创建数据库表
  create table 表名称(列声明);
- 重定向执行脚本
  mysql -D 数据库名 -u root -p < createtable.sql

## 操作

```sql
SHOW DATABASES; -- 显示所有数据库
CREATE DATABASE test; -- 创建
DROP DATABASE test;-- 删除
USE test;-- 切换数据库
SHOW TABLES;
DESC students;-- 查看一个表的结构
SHOW CREATE TABLE students;--查看创建表的语句
DROP TABLE students;-- 删除表
ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;--表新增列
ALTER TABLE students CHANGE COLUMN birth birthday VARCHAR(20) NOT NULL; -- 修改列
ALTER TABLE students DROP COLUMN birthday;-- 删除列
```
