class Student {
    fullName: string;
    constructor(public firstName, public middleInital, public lastName) {
        this.fullName = firstName + ' ' + middleInital + " " + lastName
    }
    // 上下的写法等效，但上面的代码量更少
    /* fullName: string;
    firstName: string;
    middleInital: string;
    lastName: string;
    constructor(firstName: string, middleInital: string, lastName: string) {
        this.fullName = firstName + ' ' + middleInital + " " + lastName
        this.firstName = firstName
        this.middleInital = middleInital
        this.lastName = lastName
    } */

}
let user = new Student('Steve', 'M.', "Xu")


interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    // return 'hello, ' + person.firstName + ' ' + person.lastName;
    return `hello, ${person.firstName}${person.lastName}`
}
console.dir(user)
console.dir(greeter(user))
// console.dir(Student)