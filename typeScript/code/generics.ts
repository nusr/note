function identity<T>(arg: T): T {
    return arg;
}
let result1 = identity<string>('identity');
let result2 = identity('identity2');
console.log(result1);
console.log(result2);

class GenericsNumber<T>{
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericsNumber = new GenericsNumber<number>();
myGenericsNumber.zeroValue = 0;
myGenericsNumber.add = function (x, y) {
    return x + y;
}
console.log(myGenericsNumber.add(34, 5454))