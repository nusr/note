let isDone: boolean = false;

let decliteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

let firstName: string = 'Steve';
let userInfo: string = `name: ${firstName} age: ${decliteral}`;

let list: Array<number> = [1, 2, 3];
let constArray: ReadonlyArray<number> = [1,2,3]
let listArray: number[] = [1, 2, 3];

let tuple: [string, number];
tuple = ['hello', 10]
// tuple = [10, 'hello'] //error
tuple[3] = 'world' // 越界元素使用联合类型
// tuple[6] = true // error

enum Color { Red, Green = 2, blue }
let colorGreen: number = Color.Green
let colorName: string = Color[2]
console.log(colorGreen)
console.log(colorName)

let notSure: any = 4;
notSure.iFItExists()
notSure.toFixed();

let prettySure: Object = 4;
// prettySure.toFixed() // Error