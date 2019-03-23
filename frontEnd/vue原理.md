## 监控对象变化
http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/
```js
const OP = Object.prototype;

export class Jsonob {
    constructor(obj, callback) {
        if (OP.toString.call(obj) !== '[object Object]') {
            console.error('This parameter must be an object：' + obj);
        }
        this.$callback = callback;
        this.observe(obj);
    }

    observe(obj) {
        Object.keys(obj).forEach((key, index, keyArray) => {
            let val = obj[key];
            Object.defineProperty(obj, key, {
                get() {
                    return val;
                },
                set: (newVal) => {
                    this.$callback(newVal);
                }
            });

            if (OP.toString.call(obj[key]) === '[object Object]') {
                this.observe(obj[key]);
            }

        });

    }
}
```