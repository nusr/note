class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}`)
    }
}
class Snake extends Animal {
    constructor(name: string) {
        //超类有构造函数，子类必须调用super()
        super(name)
    }
    move(distanceInMeters = 5) {
        console.log('slithering...')
        super.move(distanceInMeters)
    }
}
class Horse extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distanceInMeters = 45) {
        console.log('Galloping...')
        super.move(distanceInMeters)
    }
}
let snakeInstance = new Snake('Snake')
let horseInstace: Animal = new Horse('Horse')
snakeInstance.move()
horseInstace.move()


let passCode = 'secret passcode';
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName
    }
    set fullName(newName: string) {
        if (passCode && passCode === 'secret passcode') {
            this._fullName = newName;
        } else {
            console.error('Error:Unauthorized update of employee')
        }
    }
}
let employee = new Employee()
employee.fullName = 'Steve Xu'
if (employee.fullName) {
    console.log(employee.fullName)
}