function addFun(x: number, y: number): number {
    return x + y;
}
let addExpress = function (x: number, y: number): number {
    return x + y;
}
let addHigh: (x: number, y: number) => number =
    function (x: number, y: number): number {
        return x + y;
    }
console.log(addFun(3, 5));
console.log(addExpress(89, 809));
console.log(addHigh(45, 45))

function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return `${firstName} ${lastName}`
    } else {
        return firstName;
    }
}
console.log(buildName('Bob'))
console.log(buildName('Bob', 'Adams'))

function concatName(firstName = 'steve', ...restOfName: string[]) {
    return firstName + ' ' + restOfName.join(' ');
}
console.log(concatName())
console.log(concatName('Bob'))
console.log(concatName('Bob', 'Alex', 'Adams'))
