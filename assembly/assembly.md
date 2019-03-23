# 汇编

## 环境搭建

- [文件下载地址](https://pan.baidu.com/s/1yh5eDXiTRKpAoNkV9L6PTw)
- DOSBOX 双击安装，点击安装目录下的 **DOSBox 0.74-2 Options.bat** ，添加如下配置

```
[autoexec]
# Lines in this section will be run at startup.
# You can put your MOUNT lines here.
mount c d:\assembly
c:
```

- 新建文件夹 **d:\assembly**,将下载压缩包 **tool** 文件夹下的所有文件拷贝到该文件夹下。
- 启动 DOSBOX，在 **tool** 文件夹下新建 **hello.asm** 文件，文件内容如下.

```asm
DATA   	SEGMENT
				STRING 	DB 'HELLO WORLD!',13,10,'$'
DATA   	ENDS

CODE 	SEGMENT
		ASSUME CS:CODE,DS:DATA
START:
		MOV		AX,DATA
		MOV 	DS,AX
		LEA		DX,STRING
		MOV		AH,9
		INT 	21H
		MOV 	AH,4CH
		INT 	21H
CODE  	ENDS
		END 	START
```

- 依次运行 `masm hello;` `link hello;` `hello` 输出 **Hello World!** 证明安装成功。
