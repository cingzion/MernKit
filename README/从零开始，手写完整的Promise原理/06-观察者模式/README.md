#### 06-观察者模式

- 实例
```ts
    // 06-观察者模式
    
    /**
     * 发布订阅 发布 和 订阅 （蹭有第三方 arr） 发布和订阅之间没有任意关联
     *
     * 1、观察者模式 观察者 和 被观察者之前是存在关联的 （内部还是发布订阅）
     */
    
    // 被观察者
    class Subject {
        public name: string;    // 实例上有一个 name 属性
        public state: string;   // 实例上有一个 state 属性
        observers: Observer[];          // 声明一个数组,是类里面的一个数组
        constructor(name: string) {
            this.name = name;
            this.observers = [];
            this.state = "我现在很开心";
        };
    
        // 方法，用来注册的
        attach(o: Observer) {
            // o 就是 传入 观测我的人
            this.observers.push(o);// 表示把当前的观测者，放到了被观测者的身上
        }
    
        // 状态变化
        setState(newState: string) {
            // 更新状态
            this.state = newState;
            // 调用被观察的 update() 的方法
            this.observers.forEach(o => o.update(this))
        }
    
    }
    
    // 观察者
    class Observer {
        public name: string; // 实例上有一个 name 属性
        constructor(name: string) {
            this.name = name;
        }
    
        // 被调用的观察都的方法
        update(baby: Subject) {
            let str = `${baby.name} 对 ${this.name} 说 ${baby.state}`
            console.log("打印的结果是：", str);
        }
    }
    // 说明如：我家一个小宝宝 和 我媳妇，需要观测小宝宝的变化，是高兴还是不高兴
    
    // 小宝宝
    let baby = new Subject('小宝宝');
    
    // 父母
    let o1 = new Observer('爸爸');
    let o2 = new Observer('妈妈');
    
    // 注册一个方法到小宝宝上面去，而Subject这个类里要有一个方法叫注册(叫做 attach)
    baby.attach(o1);
    baby.attach(o2);
    
    // 状态变化
    /**
     * 状态一变，变会通知所有的观察者
     */
    baby.setState('我不开心了');
    baby.setState('开心了');
    
    /*
    打印的结果是： 小宝宝 对 爸爸 说 我不开心了
    打印的结果是： 小宝宝 对 妈妈 说 我不开心了
    打印的结果是： 小宝宝 对 爸爸 说 开心了
    打印的结果是： 小宝宝 对 妈妈 说 开心了
     */

```
