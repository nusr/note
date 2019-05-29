# TypeScript

TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

## 安装

1.  npm 安装: `npm install -g typescript`

## 编译代码

*   `tsc hello.ts`

## 变量类型

*   `boolean` : true false
*   `number` : 都是浮点数
*   `string` : " ' 模板字符串
*   `Union Types`: `let myVal:string | number;` 取值为多种类型中的一种
*   `array` :数组每个元素类型相同
*   `tuple` : 元组,数组类型可以不必相同
*   `enum`: 枚举类型默认从`0`开始编号，并且可以由枚举的值得到它的名字
*   `any` : 任意类型
*   `void` : 没有任何类型，只能赋值`null` `undefined`
*   `null`
*   `undefined`
*   `never` : 返回 error 或者没有返回值
*   `object`

## any

- 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
- 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

### 类型推论

*   即类型在哪里，以及如何被推断出来
*   最佳通用类型
*   上下文类型

## enum

*   定义带名字的常量，清晰表达意图
*   数字或字符串枚举
*   字符串枚举每个成员都必须使用字符串字面量初始化
*   反向映射，通过枚举值得到枚举名
*   异构枚举 混合字符串和数字，不建议使用
*   常量枚举 `const`
*   外部枚举 `declare`

## interface

* 首字母大写
* 赋值的时候，变量的形状必须和接口的形状保持一致。
*   `tsc implements.ts`
*   接口里面定义的属性键，都要存在
*   可选属性`?` `interface SquareConfig{color?: string;width?: number}`
*   只读属性`readonly` `interface Point{readonly x: number;readonly y: number}`
*   变量使用`const` 属性使用`readonly`
*   继承接口 `extends`
*   接口继承类

```ts
// 任意属性
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}
// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// error
```

## 数组

```ts
// 1. 方括号
let arr1:number[] = [1,2]
// 2. 数组范型
let arr2 : Array<number> = [1,2]
// 3. 接口
interface NumberArray{
    [index:number]:number;
}
let arr3 : NumberArray = [1,2,3]
// any
let list : any[] = ['test',12 ,{name: 'steve'}]

// 类数组
// 内置对象
```

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
*   重载

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

## 类型断言

类似类型转换
```ts
// 1.
<类型>值

// 2.
值 as 类型
```

## 声明文件

.d.ts 结尾文件

```ts
// jQuery.d.ts
declare var jQuery: (selector: string) => any;
```

```
npm install -g dts-gen
npm install -g react
dts-gen -m react
```

## 类型别名

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```