var rows = 4;
var cols = 4;
//1表示黑块，0表示白块
var blocks = [];
//计时
var timeCount = 0.000;
//点击的块数
var clickBlocks = 0;
//计时器
var timeId = null;
//整个盒子大小
var containerWidth;
var blockWidth;
var documentWidth;
// 最好成绩
var bestScore = 0;

function $(name) {
    return document.querySelector(name);
}

function $all(name) {
    return document.querySelectorAll(name);
}
window.onload = function() {
    // 先设置宽高，然后初始化
    prepareMobile();
    //游戏初始化
    init();
}

function prepareMobile() {
    documentWidth = window.screen.availWidth;
    if (documentWidth > 500) {
        containerWidth = 400;
        blockWidth = 100;
    } else {
        containerWidth = parseInt(documentWidth * 0.95);
        blockWidth = containerWidth / 4;
    }
    // console.log(documentWidth, containerWidth, blockWidth)
    $('#block-container').style.width = containerWidth + 'px';
    $('#block-container').style.height = containerWidth + 'px';

}

function whichBlock(i) {
    //是否为第一次敲击
    if (!blocks[rows - 1][i]) {
        isGameOver();
        return;
    }
    if (clickBlocks === 0) {
        //敲击正确，向下移动
        runTime();
        clearText();
    }
    moveDown();
}
document.addEventListener('keydown', function(event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
        //H
        case 72:
            whichBlock(0);
            break;
            //J
        case 74:
            whichBlock(1);
            break;
            //K
        case 75:
            whichBlock(2);
            break;
            //L
        case 76:
            whichBlock(3);
            break;
        default:
            isGameOver();
            break;
    }
});

function handleClickTouch(event) {
    var str = event.target.id;
    // console.log(str)
    switch (str) {
        //H
        case 'blackBlock-3-0':
            whichBlock(0);
            break;
            //J
        case 'blackBlock-3-1':
            whichBlock(1);
            break;
            //K
        case 'blackBlock-3-2':
            whichBlock(2);
            break;
            //L
        case 'blackBlock-3-3':
            whichBlock(3);
            break;
        default:
            isGameOver();
            break;
    }
    // console.log('click')
}
document.addEventListener('click', handleClickTouch);
// document.addEventListener('touchstart', handleClickTouch);

function init() {
    // 获取最好成绩
    bestScore = parseInt(localStorage.getItem('bestScores') || 0);
    $('#bestScoreId').innerText = bestScore;
    for (var i = 0; i < rows; i++) {
        blocks[i] = [];
        for (var j = 0; j < cols; j++) {
            blocks[i][j] = 0;
            //白块布局
            var whiteBlock = $('#whiteBlock-' + i + '-' + j);
            whiteBlock.style.top = getPosTop(i, j) + 'px';
            whiteBlock.style.left = getPosLeft(i, j) + 'px';
            // console.log(blockWidth)
            whiteBlock.style.width = blockWidth + 'px';
            whiteBlock.style.height = blockWidth + 'px';
            //黑块布局
            $('#block-container').innerHTML += '<div class="blackBlock" id="blackBlock-' + i + '-' + j + '"></div>';
            var blackBlock = $('#blackBlock-' + i + '-' + j);
            blackBlock.style.top = getPosTop(i, j) + 'px';
            blackBlock.style.left = getPosLeft(i, j) + 'px';
            blackBlock.style.width = blockWidth + 'px';
            blackBlock.style.height = blockWidth + 'px';
            blackBlock.style.lineHeight = blockWidth + 'px';
        }
    }
    //每一行随机生成一个黑块，且所有黑块不能再同一列
    for (var i = 0; i < rows; i++) {
        var count = 0;
        var randY = Math.floor(Math.random() * cols);
        while (i > 0 && blocks[i - 1][randY]) {
            //当上一行的同一列是黑块，重新生成位置
            randY = Math.floor(Math.random() * cols);
            count++;
            if (count > 50) {
                break;
            }
        }
        blocks[i][randY] = 1;
        $('#blackBlock-' + i + '-' + randY).style.backgroundColor = '#000';
    }
    timeCount = 0;
    clickBlocks = 0;
    if (containerWidth < 400) {
        $('#blackBlock-3-0').innerText = '点击开始';
        $('#blackBlock-3-1').innerText = '点击开始';
        $('#blackBlock-3-2').innerText = '点击开始';
        $('#blackBlock-3-3').innerText = '点击开始';
        return;
    }
    $('#blackBlock-3-0').innerText = '按H开始';
    $('#blackBlock-3-1').innerText = '按J开始';
    $('#blackBlock-3-2').innerText = '按K开始';
    $('#blackBlock-3-3').innerText = '按L开始';
}

function getPosTop(i, j) {
    return i * blockWidth;
}

function getPosLeft(i, j) {
    return j * blockWidth;
}

function moveDown() {
    for (var i = rows - 1; i >= 0; i--) {
        for (var j = cols - 1; j >= 0; j--) {
            if (blocks[i][j]) {
                //是黑色块就执行
                blocks[i][j] = 0;
                $('#blackBlock-' + i + '-' + j).style.backgroundColor = '#fff';
                if (i !== (rows - 1)) {
                    //上一列设置为白色，下一列设置为黑色
                    blocks[i + 1][j] = 1;
                    $('#blackBlock-' + (i + 1) + '-' + j).style.backgroundColor = '#000';
                }

            }
        }

    }
    var randY = Math.floor(Math.random() * cols);
    blocks[0][randY] = 1;
    setTimeout(function() {
        $('#blackBlock-0-' + randY).style.backgroundColor = '#000';
    }, 25)
    clickBlocks++;
    updateScore()
}

function updateScore() {
    $('#scoreCount').innerText = clickBlocks;
    if (clickBlocks > bestScore) {
        $('#bestScoreId').innerText = clickBlocks;
    }
}

function isGameOver() {
    //停止计时器
    clearTimeout(timeId);
    //获取计时器最后的时间
    var str = timeCount.toString().replace(/(\d+)\.(\d{3})(\d*)/g, '$1.$2');
    //游戏结束提示
    if (!document.getElementById("info")) {
        $("#block-container").innerHTML += '<div id="info"><p id="getTime">用时：<span>' + str + '</span></p><p>得分：<span>' + clickBlocks + '</span></p><a href="javascript:restartGame();" id="restartGame">Try Again</a></div>';
        $("#info").style.width = containerWidth + "px";
        $("#info").style.height = containerWidth + "px";
        $("#info").style.backgroundColor = "rgba(0,0,0,.5)";
    }
    if (clickBlocks > bestScore) {
        localStorage.setItem('bestScores', clickBlocks);
    }
}

function runTime() {
    timeCount += 0.001;
    //正则替换，保证整数位不变，小数始终是3位
    var str = timeCount.toString().replace(/(\d+)\.(\d{3})(\d*)/g, '$1.$2');
    // console.log(str);
    $("#timeCount").innerText = str;
    timeId = setTimeout(runTime, 1);
    if (timeCount >= 10.00) {
        isGameOver();
    }
}

function clearText() {
    $('#blackBlock-3-0').innerText = '';
    $('#blackBlock-3-1').innerText = '';
    $('#blackBlock-3-2').innerText = '';
    $('#blackBlock-3-3').innerText = '';
}

function restartGame() {
    var arr = $all(".blackBlock");
    for (var i = arr.length - 1; i >= 0; i--) {
        arr[i].parentNode.removeChild(arr[i]);
    }
    $("#info").parentNode.removeChild($("#info"))
    console.log(2)
    init();
    $("#timeCount").innerText = "0.000";
}