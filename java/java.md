# Java

JVM： MyProgram.java 编译器--> MyProgram.class 解释器--> MyProgram 应用程序
JDK > JRE

## 安装

### 环境变量

- CLASSPATH **.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar**
- JAVA_HOME **C:\Program Files\Java\jdk-11.0.1**
- path **%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;**

### 运行

```java
//HelloWorld.java
public class HelloWorld{
	public static void main(String[] args){
		System.out.println("Hello World");
	}
}
```

编译： `javac HelloWorld.java`
解释： `java HelloWorld`

## Data Types

| Data Types            | bits                        | default value |
| --------------------- | --------------------------- | ------------- |
| byte                  | 8-bit                       | 0             |
| short                 | 16-bit                      | 0             |
| int                   | 32-bit                      | 0             |
| long                  | 64-bit                      | 0L            |
| float                 | 32-bit                      | 0.0f          |
| double                | 64-bit                      | 0.0d          |
| boolean               | 1-bit(true false)           | false         |
| char                  | 16-bit('\u0000' ~ '\uffff') | '\u0000'      |
| String(or any object) |                             | null          |

Always use 'single quotes' for char literals and "double quotes" for String literals. 
Finally, there's also a special kind of literal called a class literal, formed by taking a type name and appending ".class"; for example, String.class. This refers to the object (of type Class) that represents the type itself.

An array is a container object that holds a fixed number of values of a single type.

```
long[] arr1;//推荐
long arr2[];//不推荐
arr1 = new long[100];
```

## Operator Precedence
All binary operators except for the assignment operators are evaluated from left to right; assignment operators are evaluated right to left.

|Operators	|Precedence|
|-|-|
|postfix|	expr++ expr--|
|unary|	++expr --expr +expr -expr ~ !|
|multiplicative|	* / %|
|additive|	+ -|
|shift|	<< >> >>>|
|relational	|< > <= >= instanceof|
|equality	|== !=|
|bitwise AND|	&|
|bitwise exclusive OR|	^|
|bitwise inclusive OR|	\||
|logical AND|	&&|
|logical OR|	\|\||
|ternary|	? :|
|assignment|	= += -= *= /= %= &= ^= \|= <<= >>= >>>=|

When using the instanceof operator, keep in mind that null is not an instance of anything

## Control Flow 

An if-then-else statement can test expressions based on ranges of values or conditions, whereas a switch statement tests expressions based only on a single integer, enumerated value, or String object

- decision-making statements: if-then if-then-else switch
- looping statements:for while do-while
- branching statements:break continue return

Operators may be used in building expressions, which compute values.
Expressions are the core components of statements.
Statements may be grouped into blocks.

## OOP

1. Object:state and behavior
1. Class:A class is the blueprint from which individual objects are created.
1. Inheritance:each class is allowed to have one direct superclass, and each superclass has the potential for an unlimited number of subclasses:
1. Interface: an interface is a group of related methods with empty bodies. If your class claims to implement an interface, all methods defined by that interface must appear in its source code before the class will successfully compile.
1. Package:A package is a namespace that organizes a set of related classes and interfaces


## 注释

- 文档注释 /\*\* javadoc 命令可以从注释中提取内容，生成 API 文档
- 单行注释 //
- 多行注释 /\* \*/
