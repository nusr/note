enum Direction {
    Up = 1,
    Down,//2
    Left,
    Right
}
enum Direction1 {
    Up, //0
    Down, //1
    Left,
    Right
}
let up = Direction.Up
console.log(up);//1
console.log(Direction[up]);// Up
console.log(Direction1.Up);//0

enum Color {
    Red = '#f00',
    Green = '#0f0',
    Blue = '#00f'
}
let red = Color.Red
console.log(red);// #f00

