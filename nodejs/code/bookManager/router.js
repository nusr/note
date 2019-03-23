/**
 * 路由模块
 */

const express = require('express');
const router = express.Router();
const service = require('./service.js');
// 添加单个图书信息
router.post('/books/book', service.addBook);
// 删除单个图书信息
router.delete('/books/book/:id', service.deleteBook);
// 修改图书信息
router.put('/books/book', service.editBook);
// 获取所有图书信息
router.get('/books', service.getAllBooks);
// 根据ID获取单个图书信息
router.get('/books/book/:id', service.getBookById);

module.exports = router;

