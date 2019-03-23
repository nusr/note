$(function () {
    function init () {
        $.ajax({
            type: 'get',
            url: '/books',
            dataType: 'json',
            success: function (data) {
                var html = template('booTemplate', {list: data});
                $('#bookInfo').html(html);
                $("#bookInfo").on('click', 'a', function (event) {
                    if (event.target.className === 'editBook') {
                        editBook(event.target.dataset.id);
                    } else {
                        deleteBook(event.target.dataset.id);
                    }
                });
            }
        });
    }
    init();
    
    function editBook (id) {
        var form = $('#addBookForm');
        var dialog = new MarkBox(600, 400, '编辑图书', form[0]);
        dialog.init();
        $.ajax({
            type: 'get',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function (data) {
                form.find('input[name=id]').val(data.id);
                form.find('input[name=name]').val(data.name);
                form.find('input[name=author]').val(data.author);
                form.find('input[name=description]').val(data.description);
                form.find('input[name=category]').val(data.category);

                form.find('input[type=submit]').on('click', function (event) {
                    event.preventDefault();
                    $.ajax({
                        type: 'put',
                        url: '/books/book',
                        data: form.serialize(),
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data.message);
                            dialog.close();
                            init();
                        },
                        error: function () {
                            alert('修改数据失败')
                        }
                    })
                })
            }
        })
    }
    function deleteBook (id) {
        $.ajax({
            type: 'delete',
            url: '/books/book/' + id,
            dataType: 'json',
            success: function (data) {
                // console.log(data.message);
                init();
            },
            error: function () {
                alert('删除数据失败')
            }
        });
    }
    $('#addBook').on('click', function () {
        clearForm();
        var form = $('#addBookForm');
        var dialog = new MarkBox(600, 400, '添加图书', form[0]);
        dialog.init();
        form.find('input[type=submit]').on('click', function (event) {
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/books/book',
                data: form.serialize(),
                dataType: 'json',
                success: function (data) {
                    // console.log(data.message);
                    dialog.close();
                    init();
                },
                error: function () {
                    alert('添加数据失败')
                }
            })
        })
    });
    function clearForm () {
        $('#addBookForm').find('input[type=text]').val("");
    }
})