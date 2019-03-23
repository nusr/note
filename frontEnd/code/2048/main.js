//存放数字格，0表示没有数字，1表示有数字
var board = [];
//存放分数
var score = 0;
//最好成绩记录
var bestScore = 0;
var documentWidth;
var gridContainerWidth;
var gridContainerPadding;
var gridCellWidth;
var numberCellLineHeight;
var numberCellFontSize;
//游戏结束后，没有按下new game,或try again之前，不能移动数字或合并
var canMoveNumber = true;
//4 2 2，右移时，出现这种情况，就会2与2合并为4，4与4合并为8，需要消除这种情况
//用一个数组存放合并的情况
var hasConflict = [];
var gridContainer = $('#grid-container');
window.onload = function() {
    documentWidth = window.screen.availWidth;
    prepareMobile();
    newGame();
};
document.onkeydown = function(event) {
    // console.log(event.keyCode);
    //阻止按上下箭头时移动窗口的默认事件
    var num = 15;
    event.preventDefault();
    if (!canMoveNumber) {
        return;
    }
    switch (event.keyCode) {
        case 100: //4
        case 37: //left
        case 65: //A
            if (moveLeft()) {
                setTimeout(genetateOneNumber, num);
                setTimeout(isGameOver, num);
            }
            break;
        case 102: //6
        case 39: //right
        case 68: //D
            if (moveRight()) {
                setTimeout(genetateOneNumber, num);
                setTimeout(isGameOver, num);
            }
            break;
        case 104: //8
        case 38: //UP
        case 87: //W
            if (moveTop()) {
                setTimeout(genetateOneNumber, num);
                setTimeout(isGameOver, num);

            }
            break;
        case 101: //5
        case 40: //down
        case 83: //S
            if (moveDown()) {
                setTimeout(genetateOneNumber, num);
                setTimeout(isGameOver, num);
            }
            break;
        default:
            break;
    }

};
var startX, startY, endY, endX, distX, distY;
document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    // console.log(startX, startY);
    // console.dir(event.touches)
});
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
});
document.addEventListener('touchend', function(event) {
    var num = 15;
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    // console.log(endX, endY);
    distX = endX - startX;
    distY = endY - startY;
    // console.log(distX, distY);
    if (distX * distX + distY * distY > 25 && canMoveNumber) {
        if (Math.abs(distX) > Math.abs(distY)) {
            if (distX > 0) {
                //right
                if (moveRight()) {
                    setTimeout(genetateOneNumber, num);
                    setTimeout(isGameOver, num);
                }
            } else {
                //left
                if (moveLeft()) {
                    setTimeout(genetateOneNumber, num);
                    setTimeout(isGameOver, num);
                }
            }
        } else {
            if (distY > 0) {
                if (moveDown()) {
                    setTimeout(genetateOneNumber, num);
                    setTimeout(isGameOver, num);
                }
            } else {
                //up
                if (moveTop()) {
                    setTimeout(genetateOneNumber, num);
                    setTimeout(isGameOver, num);

                }
            }
        }
    }
});

function prepareMobile() {
    if (documentWidth > 640) {
        gridContainerWidth = 460;
        gridContainerPadding = 20;
        gridCellWidth = 100;
        numberCellLineHeight = 100;
        numberCellFontSize = 40;
    } else {
        gridContainerWidth = parseInt(getStyle(gridContainer, "width"));
        gridCellWidth = parseInt(getStyle($('#grid-cell-0-0'), "width"));
        gridContainerPadding = parseInt(getStyle(gridContainer, "padding"));
        numberCellLineHeight = gridCellWidth;
        numberCellFontSize = gridContainerPadding * 2;
        changeTipsPosition();
    }
    gridContainer.style.width = gridContainerWidth + 'px';
    gridContainer.style.height = gridContainerWidth + 'px';
    gridContainer.style.padding = gridContainerPadding + 'px';
    var gridCell = $all('.grid-cell');
    var len = gridCell.length,
        i = 0;
    for (; i < len; i++) {
        // console.log(gridCellWidth);
        gridCell[i].style.width = gridCellWidth + 'px';
        gridCell[i].style.height = gridCellWidth + 'px';
    }
    // console.log('gridContainer: ' + gridContainerWidth + " gridCellWidth: " + gridCellWidth + " gridContainerPadding: " + gridContainerPadding);
}

function changeTipsPosition(){
    return
    $('#tips').style.display = 'none';
    $('#tips-image').style.display = 'block';
    $('#tips-image').className = "mobile";
    $('#tips-image').addEventListener('click',function(){
        $('#tips').style.display = 'block';
        $('#tips').style.left = "0px";
        $('#tips').style.bottom = "0px";
        $('#tips').style.backgroundColor = "rgba(0,0,0,.8)";
        $('#tips').style.color = "#fff";
        $('#tips').style.zIndex = 99999;
        $('#close-tips').style.display = "block";
        this.style.display = 'none';
    });
    $('#close-tips').addEventListener('click',function(){
        $('#tips').style.display = 'none';
        $('#tips-image').style.display = "block";
        this.style.display = 'none';
    })
}
function newGame() {
    //初始化棋盘格
    init();
    //随机位置生成两个随机数
    genetateOneNumber();
    genetateOneNumber();
    //读取最好成绩
    bestScore = +localStorage.getItem("bestScore");
    $("#bestScore").innerHTML = bestScore;
}

function init() {
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflict[i] = [];
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.style.top = getPosTop(i, j) + 'px';
            gridCell.style.left = getPosLeft(i, j) + 'px';
            board[i][j] = 0;
            hasConflict[i][j] = false;
        }
    }
    score = 0;
    updateScore(score);
    updateBoardView();
}

function updateBoardView() {
    var i;
    var numbers = $all(".number-cell");
    for (i = 0; i < numbers.length; i++) {
        var temp = numbers[i];
        temp.parentNode.removeChild(temp);
    }
    for (i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            gridContainer.innerHTML += '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>';
            var numberCell = $('#number-cell-' + i + '-' + j);
            numberCell.style.lineHeight = numberCellLineHeight + 'px';
            numberCell.style.fontSize = numberCellFontSize + 'px';
            numberCell.style.left = getPosLeft(i, j) + 'px';
            numberCell.style.top = getPosTop(i, j) + 'px';
            if (board[i][j] === 0) {
                numberCell.style.height = '0px';
                numberCell.style.width = '0px';
            } else {
                numberCell.style.height = gridCellWidth + 'px';
                numberCell.style.width = gridCellWidth + 'px';
                numberCell.style.color = getNumberColor(board[i][j]);
                numberCell.style.backgroundColor = getNumberBackgroundColor(board[i][j]);
                numberCell.innerHTML = board[i][j];
            }
            hasConflict[i][j] = false;
        }
    }
}

function genetateOneNumber() {
    if (noSpace(board)) {
        return false;
    }
    //随机位置
    var randX = Math.floor(Math.random() * 4);
    var randY = Math.floor(Math.random() * 4);
    var count = 0;
    //优化随机位置算法
    while (true) {
        if (board[randX][randY] == 0 || count > 50) {
            break;
        }
        randX = Math.floor(Math.random() * 4);
        randY = Math.floor(Math.random() * 4);
        count++;
    }
    if (count > 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }
    //随机一个数字
    var randNum = Math.random() < 0.5 ? 2 : 4;
    //随机位置显示数字
    board[randX][randY] = randNum;
    showNumberWithAnimation(randX, randY, randNum);
    // console.log(randX, randY, randNum);
    return true;
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, i, k);
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflict[i][k]) {
                        //add
                        board[i][k] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, i, k);
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 60);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, i, k);
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflict[i][j]) {
                        //add
                        board[i][k] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, i, k);
                        updateScore(score);
                        hasConflict[i][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 60);
    return true;
}

function moveTop() {
    if (!canMoveTop(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, k, j);
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockHorizontal(j, k, i, board) && !hasConflict[k][j]) {
                        //add
                        board[k][j] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, k, j);
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 60);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showMoveWithAnimation(i, j, k, j);
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockHorizontal(j, i, k, board) && !hasConflict[k][j]) {
                        //add
                        board[k][j] += board[i][j];
                        score += board[i][j];
                        board[i][j] = 0;
                        //move
                        showMoveWithAnimation(i, j, k, j);
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 60);
    return true;
}

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }

}

function restartGame() {
    var temp = $("#info");
    temp && temp.parentNode.removeChild(temp);
    newGame();
    canMoveNumber = true;
}

function gameOver() {
    //防止重复添加结束提示

    if (!$('#info')) {
        gridContainer.innerHTML += '<div id="info"><p class="tips">本次得分</p><div class="sumScore">' + score + '</div><a href="javascript:restartGame();" id="restartGameButton">Try Again</a></div>';
        $("#info").style.width = gridContainerWidth + gridContainerPadding * 2 + 'px';
        $("#info").style.height = gridContainerWidth + gridContainerPadding * 2 + 'px';
        $("#info").style.backgroundColor = 'rgba(0,0,0,0.5)';
        // console.log(gridCellWidth)

        if (documentWidth > 640) {
            $("#info .tips").style.marginTop = gridCellWidth * 1.37 + 'px';
            $("#info .sumScore").style.margin = gridCellWidth * 0.52 + 'px 0px';
        } else {
            $("#info .tips").style.marginTop = gridCellWidth * 1.42 + 'px';
            $("#info .sumScore").style.margin = gridCellWidth * 0.35 + 'px 0px';
        }
        score = 0;
        updateScore(score);
        canMoveNumber = false;
    }
}
//更新得分
function updateScore(score) {
    $("#score").innerHTML = score;
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        $('#bestScore').innerHTML = bestScore;
    }
}


//动画的形式显示数字
function showNumberWithAnimation(i, j, randNum) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.style.color = getNumberColor(randNum);
    numberCell.style.backgroundColor = getNumberBackgroundColor(randNum);
    numberCell.innerHTML = randNum;
    animation(numberCell, {
        "left": getPosLeft(i, j),
        "top": getPosTop(i, j),
        "height": gridCellWidth,
        "width": gridCellWidth
    });
}
//动画的形式移动数字
function showMoveWithAnimation(i, j, i, k) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    animation(numberCell, {
        left: getPosLeft(i, k),
        top: getPosTop(i, k)
    });
}

function animation(obj, json, callback) {
    var k,
        target,
        leader,
        flag,
        step;
    clearInterval(obj.timeId);
    obj.timeId = setInterval(function() {
        flag = true;
        for (k in json) {
            if (k === 'opacity') {
                leader = getStyle(obj, k) * 100;
                target = json[k] * 100;
                step = (target - leader) / 5;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                obj.style[k] = leader / 100;
            } else if (k === 'zIndex') {
                obj.style.zIndex = obj[k];
            } else {
                leader = parseInt(getStyle(obj, k)) || 0;
                target = json[k];
                step = (target - leader) / 5;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader += step;
                obj.style[k] = leader + 'px';
            }
            if (flag !== leader) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timeId);
            callback && callback();
        }
    }, 15);

}

function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function $(selector, dom) {
    dom = dom || document;
    return dom.querySelector(selector);
}

function $all(selector, dom) {
    dom = dom || document;
    return dom.querySelectorAll(selector);
}

function getPosTop(i, j) {
    return gridContainerPadding + (gridContainerPadding + gridCellWidth) * i;
}

function getPosLeft(i, j) {
    return gridContainerPadding + (gridContainerPadding + gridCellWidth) * j;
}

function getNumberColor(num) {
    if (num <= 4) {
        return "#776e65"
    }
    return "#fff";
}

function getNumberBackgroundColor(num) {
    switch (num) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
    return "#000";
}

//没有空的格子
function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//任意相邻的两个格子数字都不相同
function noMove(board) {
    if (canMoveDown(board) || canMoveTop(board) || canMoveLeft(board) || canMoveRight(board)) {
        return false;
    }
    return true;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveTop(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//水平方向的格子都为空
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
//垂直方向的格子都为空
function noBlockVertical(col, row1, row2, board) {
    for (var j = row1 + 1; j < row2; j++) {
        if (board[j][col] != 0) {
            return false;
        }
    }
    return true;
}