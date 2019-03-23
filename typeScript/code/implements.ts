interface Person {
    firstName: string;
    lastName: string;
}
//下面两张写法均可以
/* interface Person {
    firstName: string,
    lastName: string
}
interface Person {
    firstName: string
    lastName: string
} */
function greeter(person: Person) {
    return 'Hello, ' + person.firstName + " " + person.lastName;
}
let user = {
    firstName: 'Steve',
    lastName: 'Xu'
}

/* let user = {
    first: 'Steve',
    last: 'Xu'
} */ //error

/* let user = {
    firstName: 'Steve'
}
 */ //error
console.log(greeter(user))