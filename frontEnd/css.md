https://github.com/chokcoco/iCSS

## css3 单位

*   rem 相对于根元素字体大小
*   vw 相对于视窗的宽度：视窗宽度是 100vw
*   vh 相对于视窗的宽度：视窗宽度是 100vh
*   vm 相对于视窗的宽度或高度，取决于那个更小
*   视窗指 window.innerWidth / window.innerHeight
*   可以用来制作完全覆盖页面的遮罩层

## 块级元素 vs 内联元素

*   块级负责结构
*   内联负责样式

## 替换元素 vs 非替换元素

*   content 属性决定了元素是替换元素还是非替换元素 (chrome 所有元素都支持 content 属性)
*   content 属性生成的内容都是替换元素
*   content 作用
    1.  清楚浮动 `.clear:after{content:'';display:block;clear:both;}`
    2.  字体图标 `content:''`
    3.  生成图片 `div:before{content:url(car.jpg)}`
    4.  attr 属性值获取 `img:after{content:attr(alt)}`
    5.  计数器

## padding

*   padding 会对垂直方向产生影响，当 padding 足够大的时候，设置背景色
*   与 box-shadow,outline 等不影响外部尺寸的属性不同，padding 会影响外部尺寸
*   不建议全部重置为 `*{box-sizing:border-box}`
*   padding 的百分比值，垂直、水平方向都是相对于宽度计算

## margin

*   可以为负值
*   margin 的百分比值，垂直、水平方向都是相对于宽度计算
*   `margin:auto` 具有强烈的计算意味，具有宽度或高度（使用 writing-mode 改版文档流方向）
*   margin 失效
    1.  非替换元素 display 为 inline 的垂直 margin 无效
    1.  tr,td 元素 margin 无效
    1.  margin 合并
    1.  绝对定位元素非定位方向（即某个方向没有设置值）margin 值无效
    1.  定死高度的 margin-bottom 或者定死宽度的 margin-right

## border

*   border-width 不支持百分比
*   妙用
    1.  增加点击区域大小 `border:11px solid transparent;`
    1.  绘制图标

## line-height

*   文字的高度本质上由 line-height 决定
*   而对于非替换元素的纯内联元素，其可视高度完全由 line-height 决定
*   半行距 = （line-height - font-size) / 2
*   内联盒子的高度由高度最高的内联盒子决定
*   行高设置为 1px 50%,子级元素继承的是具体的像素，而设置为 1.5,继承的是 1.5

## 单位

1.  相对单位
    *   ex `1ex = 1个小写字母x的高度（即x-height）` IE6 开始支持 可以实现图标与文字的中间位置对齐
    *   em 1em 等于当前的 font-size 大小
    *   rem
    *   vw
    *   vh

```
//文字与图标对齐
.icon-arrow{
    display:inline-block;
    width:20px;
    height:1ex;
    background:url(arrow.png) no-repeat center;
}
```

1.  绝对单位 \*

## 尺寸

1.  元素内部尺寸 $().innerWidth $().innerHeight paddig-box,包括 padding，不含 border ,原生是 clientWidth clientHeight
1.  元素尺寸 $().width $().height border-box 包括 padding,border,原生是 offsetWidth offsetHeight
1.  元素外部尺寸 $().outerWidth(true) $().outerHeight(true) margin-box,包括 margin,padding,border,没有原生 API 大小可以是负值

## overflow

*   pc 端 document.documentElement.scrollTop
*   移动端 document.body.scrollTop

## 锚点定位

*   a 标签锚点定位
*   focus 锚点定位

## BFC(block formatting context) IFC

*   触发 BFC 的情况
    *   html 根元素
    *   float 值不为 none
    *   overflow 的值不为 auto、scroll、hidden
    *   display 的值为 table-cell、table-row、table-caption、inline-block
    *   position 的值不为 relative、static
*   实现自适应布局
*   BFC 可以清楚浮动

## 宽度分离原则

1.  width 写在外层盒子上面
2.  里面盒子写 padding,margin,border
3.  充分利用盒子的流动性

## 三无原则

1.  无宽度 仅外层限制网页主体宽度
1.  无浮动
    *   破坏文档流
    *   块状化并格式化上下文
    *   没有任何 margin 合并
1.  无图片

## 预加载

*   分离加载和执行
*   提前加载制定资源，浏览器`一定`会加载
*   prefetch 会预测加载的资源，浏览器`不一定`加载

```html
<link rel="preload" href="demo.css" as="style">
<!-- 或者 -->
<script>
const link = document.createElement('link')
link.rel="preload";
link.as = 'style';
link.href='demo.css'
document.head.appendChild(link)
</script>
```

## 问题

1.  `calc` 进行加减乘除运算 运算符左右都要有空格 `height: calc(100vh - 80px);`
1.  溢出的文本表现为 `...`

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

1.  [实现垂直居中](http://www.w3cplus.com/css/vertically-center-content-with-css)

    *   `height:100px;line-height:100px;`仅适合应用在单行文本和图片上,固定死元素的高度，也可使用水平居中

    ```html
    <div class="vertical">content</div>
    <style>
    .vertical {
        height: 100px;/*元素的高度*/
        position: absolute;
        top: 50%;/*元素的顶部边界离父元素的的位置是父元素高度的一半*/
        margin-top: -50px;/*设置元素顶边负边距，大小为元素高度的一半*/
    }
    </style>
    ```

    *   div 模拟表格 无高度限制，IE8 下不支持

    ```html
    <div id="container">
        <div id="content">content</div>
    </div>

    <style>
    #container{
        height:300px;
        display:table;
    }
    #content{
        display:table-cell;
        vertical-align:middle;
    }
    </style>
    ```

1.  css 追踪用户


1. 换肤

- 使用 **link rel=alternate** https://www.zhangxinxu.com/wordpress/2019/02/link-rel-alternate-website-skin/
- 硬核方式 https://habr.com/en/company/yandex/blog/450032/