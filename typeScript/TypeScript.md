# TypeScript

## install

1.  npm 安装: `npm install -g typescript`
2.  Visual Studio

## 编译代码

*   `tsc hello.ts`

## 类型注解

*   为函数或变量添加约束
*   静态代码分析

```js
function hello(person: string) {
    return "hello, " + person;
}
```

### 变量类型

*   `boolean` : true false
*   `number` : 都是浮点数
*   `string` : " ' 模板字符串
*   `array` :数组每个元素类型相同
*   `tuple` : 元组,数组类型可以不必相同
*   `enum`: 枚举类型默认从`0`开始编号，并且可以由枚举的值得到它的名字
*   `any` : 任意类型
*   `void` : 没有任何类型，只能赋值`null` `undefined`
*   `null`
*   `undefined`
*   `never` : 返回 error 或者没有返回值
*   `object`
*   

### 类型断言

*   类似类型转换

### 类型推论

*   即类型在哪里，以及如何被推断出来
*   最佳通用类型
*   上下文类型

### 类型兼容性

## enum

*   定义带名字的常量，清晰表达意图
*   数字或字符串枚举
*   字符串枚举每个成员都必须使用字符串字面量初始化
*   反向映射，通过枚举值得到枚举名
*   异构枚举 混合字符串和数字，不建议使用
*   常量枚举 `const`
*   外部枚举 `declare`

## interface

*   `tsc implements.ts`
*   接口里面定义的属性键，都要存在
*   可选属性`?` `interface SquareConfig{color?: string;width?: number}`
*   只读属性`readonly` `interface Point{readonly x: number;readonly y: number}`
*   变量使用`const` 属性使用`readonly`
*   继承接口 `extends`
*   接口继承类

## 泛型

*   泛型函数
*   泛型类
*   类的静态属性不能使用泛型

## 函数

*   自动推断类型
*   函数的每个参数都是必须的
*   可选参数 `?` 必须放在必须参数后面 可传可不传
*   默认参数 可传可不传
*   剩余参数 `...`

## class

*   `tsc class.ts`
*   类 = 静态部分 + 实例部分
*   类里面可以使用接口
*   在构造函数的参数上使用 public 等同于创建了同名的成员变量
*   继承
*   修饰符 : 成员默认是`public`
    *   `public`
    *   `private` 不可在外部访问 外部使用存在器访问
    *   `protected` 在派生类可以访问 不可在外部访问
    *   `readonly` 只读属性 声明或在构造函数初始化
    *   `static` 静态属性 存在于类本身
*   抽象类 `abstract` 抽象类中的抽象犯法不包含具体实现并且必须在派生类中实现

## 命名空间

*   内部模块

## 模块

*   外部模块简称

## 装饰器

1.  参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
1.  参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
1.  参数装饰器应用到构造函数。
1.  类装饰器应用到类。

## 三斜线指令

- 三斜线指令是包含单个XML标签的单行注释
- 仅可放在包含它的文件的最顶端
- 告诉编译器编译过程要引入的额外文件 `/// <reference path="..." />`

## mixins

## JSX

*   文件后缀`jsx`
*   jsx 模式
    | 模式         | 输入     | 输出                       | 输出文件后缀名 |
    | ------------ | -------- | -------------------------- | -------------- |
    | preserve     | `<div/>` | `<div/>`                   | .jsx           |
    | react        | `<div/>` | React.createElement('div') | .js            |
    | react-native | `<div/>` | `<div/>`                   | .js            |

## ECMASCRIPT 支持情况

*   模板字符串


## d.ts 

```
npm install -g react
npm install -g react
dts-gen -m react
```
