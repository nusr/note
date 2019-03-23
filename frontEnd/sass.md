# sass

## sass 基础

```
$baseFont:0px;
@for $i from 12 through 82 {
  @if ($i % 2==0) {
    .font#{$i} {
      font-size: $i + $baseFont;
    }
  }
}
/*
编译成

.font12{
    font-size:12px;
}
...
.font82{
    font-size:82px;
}
*/

.container {
  width: 1200px;
  margin: 0 auto;
}

@function mediaQuery ($width, $maxWidth) {
  @return $width * $maxWidth / 1920 * 1px;
}

@media (max-width: 1240px) {
  .container {
    width: 1000px;
  }
  @for $i from 12 through 82 {
    @if ($i % 2==0) {
      .font#{$i} {
        font-size: mediaQuery($i, 1240);
      }
    }
  }
  body {
    font-size: 12px;
  }
}
```

## 加载全局设置的 scss 文件

1.  装包：npm install sass-resources-loader --save-dev
1.  修改 webpack 配置：

```
// 使用脚手架的配置
scss: generateLoaders('sass').concat(
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, '../src/style/_variables.scss')
    }
  }
),
```
