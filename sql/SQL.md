# 数据库

## 数据库分类

1. 商用数据库 Oracle
2. 开源数据库 MySQL
3. 卓面数据库 Access
4. 嵌入数据库 Sqlite

## SQL 语言

- DDL:Data Definition Language
- DML:Data Manipulaion Language
- DQL:Data Query Language
- SQL 关键字最好大写

## 关系型数据库

一个关系型数据库由一个或数个表格组成

- 表头(header): 每一列的名称;
- 列(col): 具有相同数据类型的数据的集合;
- 行(row): 每一行用来描述某个人/物的具体信息;
- 值(value): 行的具体信息, 每个值必须与该列的数据类型相同;
- 键(key): 表中用来识别某个特定的人\物的方法, 键的值在当前列中具有唯一性。

## 数据类型

| 名称         | 类型           | 说明                                                                                       |
| ------------ | -------------- | ------------------------------------------------------------------------------------------ |
| INT          | 整型           | 4 字节整数类型，范围约+/-21 亿                                                             |
| BIGINT       | 长整型         | 8 字节整数类型，范围约+/-922 亿亿                                                          |
| REAL         | 浮点型         | 4 字节浮点数，范围约+/-1038                                                                |
| DOUBLE       | 浮点型         | 8 字节浮点数，范围约+/-10308                                                               |
| DECIMAL(M,N) | 高精度小数     | 由用户指定精度的小数，例如，DECIMAL(20,10)表示一共 20 位，其中小数 10 位，通常用于财务计算 |
| CHAR(N)      | 定长字符串     | 存储指定长度的字符串，例如，CHAR(100)总是存储 100 个字符的字符串                           |
| VARCHAR(N)   | 变长字符串     | 存储可变长度的字符串，例如，VARCHAR(100)可以存储 0~100 个字符的字符串                      |
| BOOLEAN      | 布尔类型       | 存储 True 或者 False                                                                       |
| DATE         | 日期类型       | 存储日期，例如，2018-06-22                                                                 |
| TIME         | 时间类型       | 存储时间，例如，12:20:59                                                                   |
| DATETIME     | 日期和时间类型 | 存储日期+时间，例如，2018-06-22 12:20:59                                                   |

## 注释

- 单行 `--这是注释`
- 多行 `/* 多行注释 */`

## 查询数据

### 基本查询

`SELECT * FROM <表名>;`

`SELECT * FROM students;` 查询所有学生
`SELECT 1;` 测试数据连接

### 条件查询

`SELECT * FROM <表名> WHERE <条件表达式>;`

`SELECT * FROM students WHERE score >= 80;`
`SELECT * FROM students WHERE score >= 80 AND gender = 'M';`
`NOT`,`AND`,`OR`优先级一次降低，括号可以改变优先级
`SELECT * FROM students WHERE name LIKE 'ab%';` 相似, **%** 表示任意
`SELECT * FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';` 多个条件组合使用括号

### 投影查询:查询只返回指定列

`SELECT 列1,列2,列3 FROM ...;`

`SELECT id,score FROM students;`

`SELECT 列1 别名1,列2 别名2 FROM ...`

`SELECT id,score points,name FROM students;`


### 排序:默认升序排序

`SELECT id, name, gender, score FROM students ORDER BY score DESC;` 降序排列
`SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;` 使用两个列排序，先按 `score` 排序，如果有分数相同，再按 `gengder` 排序

```sql
SELECT id, name, gender, score
FROM students
WHERE class_id = 1
ORDER BY score DESC;
-- ORDER 要放在 WHERE 后面
```


### 分页查询

```sql
-- 第一页
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 0;
/*
从0号开始取，最多取3条
LIMIT = pageSize
OFFSET = PageSize * (pageIndex - 1)
MySQL 中 LIMIT 15 OFFSET 30 可以简写为 LIMIT 30 15
*/
```

```sql
-- 第三页
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 6;
```

### 聚合查询

`SELECT COUNT(*) FROM students;` 统计学生数量
`SELECT AVG(score) average FROM students WHERE gender = 'X';` 统计平均值
`SELECT COUNT(*) num FROM students;` 将查询结果设置为 **num** 的别名
`SELECT COUNT(*) num FROM students GROUP BY class_id;` 分组统计每班人数

|聚合函数|说明|
|-|-|
|COUNT0|统计总行数|
|SUM|计算某一列的合计值，该列必须为数值类型|
|AVG|计算某一列的平均值，该列必须为数值类型|
|MAX|计算某一列的最大值|
|MIN|计算某一列的最小值|


### 多表查询(行数相乘,慎用)

`SELECT * FROM <表1><表2>;`
`SELECT *FROM students,classes;` 查询两张表

```sql
SELECT
    students.id sid,
    students.name,
    students.gender,
    students.score,
    classes.id cid,
    classes.name cname
FROM students, classes;
```

```sql
SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c;
```

### 连接查询

将另外一张表上的数据附加到主表上

```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
INNER JOIN classes c
ON s.class_id = c.id;
-- 选出所有学生，同时返回班级名称
```

```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
RIGHT OUTER JOIN classes c
ON s.class_id = c.id;
```

1. 只返回两张表匹配的记录，这叫内连接（INNER JOIN）。
1. 返回匹配的记录，以及表 A 多余的记录，这叫左连接（LEFT OUTER JOIN）。
1. 返回匹配的记录，以及表 B 多余的记录，这叫右连接（RIGHT OUTER JOIN）。
1. 返回匹配的记录，以及表 A 和表 B 各自的多余记录，这叫全连接（FULL OUTER JOIN）。
1. 交叉连接（cross join）,指的是表 A 和表 B 不存在关联字段，这时表 A（共有 n 条记录）与表 B （共有 m 条记录）连接后，会产生一张包含 n x m 条记录的新表

## 修改数据

### 插入

`INSERT INTO <表名> (字段1,字段2,...) VALUES (值1,值2,...);` 字段与值要一一对应


```sql
INSERT INTO students (class_id, name, gender, score) VALUES (2, '大牛', 'M', 80); -- 添加一条
INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81); -- 添加多条
```

### 修改

`UPDATE <表名> SET 字段1=值1 字段2=值2,...WHERE...;`

```sql
UPDATE students SET name='大牛', score=66 WHERE id=1;

UPDATE students SET name='小牛', score=77 WHERE id>=5 AND id<=7;-- 更新多条

UPDATE students SET score=score+10 WHERE score<80; -- 表达式更新

UPDATE students SET score=60;-- 会更新所有的 score字段,先使用 WHERE 选出所有记录后，再使用 UPDATE
```
### 删除

`DELETE FROM <表名> WHERE ...;`

```sql
DELETE FROM students WHERE id=1;
DELETE FROM students WHERE id >= 5 AND id <= 7; -- 删除多条
DELETE FROM students;-- 删除整个表的数据
```

## 使用SQL

```sql
REPLACE INTO students (id,class_id,name,gender,score) VALUES(1,1,'小马','F',99);-- 插入或替换

INSERT INTO students (id,class_id,name,gender,score) VALUES (1,1,'小马','F',89) ON DUPLICATE KEY UPDATE name='小马',gender='F',score=89;-- 插入或更新

INSERT IGNORE INTO students (id,class_id,name,gender,score) VALUES (1,1,'小明','F',99);-- 插入或忽略

CREATE TABLE students_Of_class1 SELECT * FROM students WHERE class_id=1;-- 复制 students表的数据到表students_Of_class1


CREATE TABLE statistics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    class_id BIGINT NOT NULL,
    average DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO statistics (class_id, average) SELECT class_id, AVG(score) FROM students GROUP BY class_id; -- 查询并写入
```

## 事务

多条语句作为一个整体进行操作的功能。

事务特性
1. Atomic,原子性
2. Consistent,一致性
3. Isolation,隔离性
4. Duration,持久性

事务分类
1. 隐式事务，单条语句
2. 显示事务

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id=1;
UPDATE accounts SET balance = balance + 100 WHERE id=2;
COMMIT;-- 提交事务


BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
ROLLBACK;-- 回滚事务
```