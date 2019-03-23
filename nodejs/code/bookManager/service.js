/**
 * 业务模块
 */
let mysql = require('./mysql.js');
const fs = require('fs');
const path = require('path');

let obook = {
    addBook: (req, res) => {
        let info = req.body;
        let sql = 'insert into book set ?';
        mysql(sql, info, (result) => {
            if (result.insertId > 0) {
                res.json({
                    id: result.insertId,
                    message: '添加数据成功'
                })
            } else {
                res.json({
                    id: 0,
                    message: '添加数据失败'
                })
            }
        });
    },
    deleteBook: (req, res) => {
        let id = req.params.id;
        let sql = 'delete from book where id=?';
        mysql(sql, [id], (result) => {
            if (result.affectedRows === 1) {
                res.json({message: '删除成功'});
            } else {
                res.json({message: '删除失败'});
            }
        });
    },
    editBook: (req, res) => {
        let info = req.body;
        let sql = 'update book set author=?,category=?,description=?,name=? where id=?';
        let data = [info.author, info.category, info.description, info.name, info.id];
        mysql(sql, data, (result) => {
            if (result.affectedRows === 1) {
                res.json({message: '修改成功'});
            } else {
                res.json({message: '修改失败'});
            }
        });
    },
    getAllBooks: (req, res) => {
        let sql = 'select * from book';
        mysql(sql, null, (result) => {
            res.json(result);
        });
    },
    getBookById: (req, res) => {
        let id = req.params.id;
        let sql = 'select * from book where id=?';
        mysql(sql, [id], (result) => {
            res.json(result[0]);
        });
    },
}

module.exports = obook;
