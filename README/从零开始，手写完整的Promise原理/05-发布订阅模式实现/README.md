#### 05-发布订阅模式实现
- 实例代码
```ts
    // age.txt
        18
    // name.txt
        jean

    // index.ts
        // 05-发布订阅模式实现
        
        const fs = require('fs'); // 发布订阅模式
        
        // 定义一个接口
        interface IEvents {
            arr: Array<Function>,
            on(fn: Function): void;
            emit(): void;
        }
        
        /**
         * on   存放是订阅
         * emit 是发布
         */
        let events: IEvents = {
            // 把函数存入数组里，调用一次、存入一次
            arr:[] , // [fn, fn], 表示数组里放的都是函数
            // 订阅
            on(fn) {
                this.arr.push(fn);
            },
            // 发布
            emit() {
                // 执行当前 arr 数组里存入的方法
                this.arr.forEach(fn => fn());
            }
        }
        
        // 定义一个 person 的接口
        interface IPerson {
            age: number;
            name: string;
        }
        const person = {} as IPerson;
        
        events.on(() => {
            if(Object.keys(person).length === 2) {
                console.log(person)
            }
        });
        
        // 每次都触发
        events.on(() => {
            console.log('触发一次');
        })
        
        // 每完成一次就通知一次, 告诉events对象里面的 emit() 它的方法一次，我完成了
        fs.readFile('./age.txt', 'utf-8', (err, data) => {
            // person 进行赋值
            person.age = data;
            // 告诉events对象里面的 emit() 它的方法一次，我完成了, 调用如下
            events.emit();
        
        })
        fs.readFile('./name.txt', 'utf-8', (err, data) => {
            person.name = data;
            events.emit();
        })
        
        /*
        触发一次
        { name: 'jean', age: '12' }
        触发一次
        
         */
        
        /**
         * 发布订阅模式：是把需要做的事放到一个数组中，等会事情发生了让订阅的事情依次执行
         */


```