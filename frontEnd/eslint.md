# eslint

- `.eslintrc.js` 配置文件
- `.eslintignore` eslint 忽略的文件
- `eslint --ext .js,.vue src` 命令行输出 eslint 校验
- `eslint --ext .js,.vue src -- --fix` 按照规则格式化代码

```js
// .eslintrc.js vue-cli 初始化项目
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    __UNIV__: false // 允许全局变量被改写
  },
  env: {
    browser: true,
    jquery: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // plugin:vue/essential
    "plugin:vue/strongly-recommended",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    eqeqeq: 2, //必须使用全等
    "no-new": 0
  }
};


```

```js
// .eslintignore App.vue 文件不使用 eslint 校验
/src/App.vue 
```