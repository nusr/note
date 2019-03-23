var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var RADIUS;
var MARGIN_TOP;
var MARGIN_LEFT;
//倒计结束设置为一天
var days = 1;
const endTime = +new Date() + days * 24 * 3600 * 1000;
//当前时间
var curShowTimeSeconds = 0;
//存放掉下来的小球
var balls = [];
//小球的颜色
var colors = ["#033", "#336", "#669", "#933", "#cc9", "#ff0", "#2f5fa8", "#9348d3", "#cf3665", "#e226c5", '#036', '#039', '#03c', '#03f', '#369', '#36c', '#36f'];
window.onload = function() {
    //下面5句代码是做屏幕适配
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    RADIUS = Math.floor(WINDOW_WIDTH * 4 / 5 / 108);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 6);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 12);
    var canvas = document.getElementById('count');
    var context = canvas.getContext('2d');
    context.canvas.width = WINDOW_WIDTH;
    context.canvas.height = WINDOW_HEIGHT;
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function() {
        //重新渲染canvas
        render(context);
        //更新倒计时间和小球运动状态
        update();
    }, 50);
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = -curTime.getTime() + endTime;
    ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}

function update() {
    var nextShowSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowSeconds / 3600);
    var nextMinutes = parseInt((nextShowSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowSeconds % 60;
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;
    //判断倒计时间是否发生变化，变化了就更新其时间
    if (nextSeconds != seconds) {
        //单独判断每个倒计时间，共6个数字，那些发生了变化，变化了就存到数组中
        if (parseInt(hours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10));
        }
        if (parseInt(hours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10));
        }
        if (parseInt(minutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10));
        }
        if (parseInt(minutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10));
        }
        if (parseInt(seconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10));
        }
        if (parseInt(seconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10));
        }
        //更新时间
        curShowTimeSeconds = nextShowSeconds;
    }
    //更新掉下来的小球状态
    updateBalls();

}

function updateBalls() {
    console.log(balls.length);
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y > WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.8;
        }
    }
    var count = 0;
    //将滚出的小球放到数组后面
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[count++] = balls[i];
        }
    }
    //去掉滚出的小球，并设置了小球的最多的数量不超过400
    while (balls.length > Math.min(count, 800)) {
        // while (balls.length > count) {
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] === 1) {
                var temp = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(temp);
            }

        }
    }
}
//重新渲染
function render(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), context);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), context);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), context);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), context);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), context);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), context);
    for (var i = 0; i < balls.length; i++) {
        context.beginPath();
        context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.fillStyle = balls[i].color;
    }
}

function renderDigit(x, y, num, context) {
    context.fillStyle = "#0094ff";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                context.beginPath();
                context.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                context.closePath();
                context.fill();
            }
        }

    }

}
