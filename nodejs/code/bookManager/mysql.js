// 封装mysql模块
// 导入mysql模块
const mysql = require("mysql");
function database(sql, data, callback) {
    // 创建数据库连接
    const connection = mysql.createConnection({
        host: "localhost:3306", // 数据库服务器所在的IP或域名
        user: "root", // 用户名
        password: "root", // 密码
        database: "test" // 数据库名
    });
    // 执行数据库连接
    connection.connect();
    // 数据库操作
    // 'SELECT count(*) as total from book'
    connection.query(sql, data, function(error, results, fields) {
        if (error) throw error;
        // console.log('The total is: ', results[0].total);
        callback(results);
    });
    // 关闭数据库连接
    connection.end();
}

module.exports = database;
