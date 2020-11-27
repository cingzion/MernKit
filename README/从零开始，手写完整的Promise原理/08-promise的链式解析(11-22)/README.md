#### 08-promise的链式解析(11-22)
- promise的链式解析
```ts
    // index.ts
    /**
     * 1、promise 可以解决多个异步并行执行，最终得到所有的结果
     * 2、异步嵌套问题
     *
     *
     *
     * 01、每个 promise 都有三个状态
     *      -1：pending 等待态
     *      -2：resolve 标识变成、成功态
     *      -3：fulfilled reject 标识变成失败态 rejected
     *
     * 02、每个 promise 需要有一个 then 方法，传入两个参数
     *      一个是成功的回调
     *      另一个是失败的回调
     * 03、new Promise 会立即执行
     *
     * 04、一旦成功就不能"失败"，一旦失败就不能"成功", 状态不可逆行
     *
     * 05、当 promise 抛出异常后，也会走失败态
     *     Promise a+ 规范：https://promisesaplus.com
     */

    // 枚举 - 存放所需要的状态
    const enum STATUS {
        pending = 'PENDING',        // 等待态
        fulfilled = 'FULFILLED',    // 标识变成、成功态
        rejected = 'REJECTED',        // 标识变成失败态 rejected
    }

    // 异常处理
    const tryCatchFn = (resolve, reject) => {
        try {
            // 失败调失败
            resolve()
        } catch (e) {
            reject(e);
        }
    };

    // 一个 promise 有三个状态
    class Promise {
        status: STATUS; // 状态
        value: any;     // 成功原因
        reason: any;    // 失败原因
        onResolveCallback: Function[];  // 成功的回调数组
        onRejectCallback: Function[];   // 失败的回调数组

        // 构造函数
        constructor(executor) {
            this.status = STATUS.pending;   // 当前默认状态
            this.value = undefined;         // 成功原因
            this.reason = undefined;        // 失败原因
            this.onResolveCallback = [];    // 成功的回调
            this.onRejectCallback = [];     // 失败的回调

            // 成功的回调
            const resolve = (value?: any) => {
                if (this.status === STATUS.pending) { // 如果当前的状态是等待态，我就把下面的状态存起来
                    // 修改状态
                    this.status = STATUS.fulfilled; // 修改成功的状态
                    this.value = value;             // 修改成功的原因
                    // 发布订阅方法
                    this.onResolveCallback.forEach( fn => fn() );
                }
            }

            // 失败的回调
            const reject = (reason?: any) => {
                if (this.status === STATUS.pending) {
                    this.status = STATUS.rejected;      // 修改失败的状态
                    this.reason = reason;               // 修改失败原因
                    // 发布订阅方法
                    this.onRejectCallback.forEach( fn => fn() );
                }
            }

            // 捕获异常
            tryCatchFn(() => {
                executor( resolve, reject );
            }, (e) => {
                reject(e);
            });

        }

        // then 方法
        /**
         * onFulfilled
         * onRejected
         */
        then(onFulfilled, onRejected) {
            // 每次调用 then 都会产生一个全新的 promise
            const promise2 = new Promise( (resolve, reject) => {
                // 判断当前的状态，是不是成功
                if (this.status === STATUS.fulfilled) {
                    tryCatchFn(() => {
                        // 成功调成功
                        let x = onFulfilled( this.value ); // 用 then 的返回值，作为下一次 then 的成功结果
                        resolve( x );
                    }, (e) => {
                        reject(e);
                    });
                }
                // 判断当前的状态， 是不是失败
                if (this.status === STATUS.rejected) {
                    tryCatchFn(() => {
                        // 失败调失败
                        let x = onRejected( this.reason );
                        resolve( x );
                    }, (e) => {
                        reject(e);
                    });
                }
                // 判断当前的状态，是等待态
                if (this.status === STATUS.pending) {
                    // 订阅
                    this.onResolveCallback.push( () => { // 这种数组里的函数，叫做切片
                        // 这里的好处就是可以增加额外的逻辑
                        let x = onFulfilled( this.value );
                        resolve( x );
                    } );

                    this.onRejectCallback.push( () => {
                        // 这里的好处就是可以增加额外的逻辑
                        let x = onRejected( this.reason );
                        resolve( x );
                    } );
                }
            } );

            return promise2;


        }
    }

    export default Promise;
```
- 调用 Promise
```ts
    // case.ts
    // 08-promise的链式解析(11-22)
    /**
     * promise 是支持链式调用的，
     * @type {Promise}
     *
     * 1、无论成功还是失败，都可以返回结果(1.出错了走错误，2、返回一个普通值（不是promise的值)，就会作为下一次 then 的成功, 3、是 promise 的情况，(会采用返回的 promise 的状态), 用promise 解析后的结果传递给下个人)
     *
     */
    const Promise = require('./bundle');

    // 1、普通值，调用 then 方法
    let promise2 = new Promise((resolve, reject) => {
        resolve("成功");
    }).then(data => {
        // throw new Error('失败了');
        return 100;
    }, (err) => {
        return 1;
    });

    promise2.then((data) => {
        console.log("打印成功的结果是： ",data);
    }, (err) => {
        console.log("打印失败的结果是： ",err);
    });

```