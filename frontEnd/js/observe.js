let Event = {
  on: function(eventName, callback) {
    if (!this.handler) {
      // 各个对象间不可引用
      Object.defineProperty(this, "handler", {
        value: {},
        enumerable: false,
        configurable: true,
        writable: true
      })
    }
    if (!this.handler[eventName]) {
      this.handler[eventName] = []
    }
    this.handler[eventName].push(callback)
  },
  emit: function(eventName, ...rest) {
    if (
      this.handler &&
      this.handler[eventName] &&
      this.handler[eventName].length > 0
    ) {
      for (let i = 0; i < this.handler[eventName].length; i++) {
        this.handler[eventName][i](this, rest)
      }
    }
  }
}
Event.on("test", function(event, result) {
  console.log(result)
})
Event.on("test", function(event) {
  console.log("test")
})
Event.emit("test", "hello world") // 输出 '[hello world]' 和 'test'
let person1 = {}
let person2 = {}
Object.assign(person1, Event)
Object.assign(person2, Event)
person1.on("call1", function() {
  console.log("person1")
})
person2.on("call2", function() {
  console.log("person2")
})
person1.emit("call1") // 输出 'person1'
person1.emit("call2") // 没有输出
person2.emit("call1") // 没有输出
person2.emit("call2") // 输出 'person2'