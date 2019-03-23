interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let square = <Square>{}
square.color = '#f00'
square.sideLength = 10;
square.penWidth = 5.0;