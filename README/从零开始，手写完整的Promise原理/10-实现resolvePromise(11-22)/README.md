#### 10-实现resolvePromise(11-22)
- index.ts
```ts
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
    
    // 核心的逻辑解析 x 的类型、来决定 promise2 起成功还是失败
    const resolvePromise = (promise2, x, resolve, reject) => {
        // console.log(promise2, x, resolve, reject);
        // 判断 x 的值决定 promise2 的关系，来判断有可能 x 是别人的 promise 可能是别人的 promise 会出现问题
        if (x === promise2) {
            return reject(new TypeError('出错了'));
        }
    
        // 判断 x 是一个对象或者是一个函数
        if((typeof x === 'object' && x !== null) || typeof x === 'function') {
            // 只有 x 是对象或者函数才有可能是 promise
            let called = false; // 表示没有调用过成功和制作
            try{
                const then = x.then;
    
                if(typeof then === 'function'){
                    then.call(x, y => { // x.then 如果这样写，可能还会走 get 方法
                        // y 可能是一个 promise, 递归解析 y 的值，直到他是一个 普通为止
                        if(called) return;
                        called = true;
                        resolvePromise(promise2, x, resolve, reject);
                    }, r => {
                        if(called) return;
                        called = true;
                        reject(r);
                    });
                }
            }catch(e){
                console.log(e)
                if(called) return;
                called = true;
                reject(e); // 走失败逻辑
            }
        }else{
            // 如果不是，那一定是一个普通值
            resolve(x)
        }
    
    }
    
    
    // 异常处理
    const tryCatchFn = (resolve, reject) => {
        setTimeout(() => {
            try {
                // 失败调失败
                resolve()
            } catch (e) {
                reject(e);
            }
        }, 0)
    
    };
    
    // 一个 promise 有三个状态
    class Promise {
        status: STATUS; // 状态
        value: any;     // 成功原因
        reason: any;    // 失败原因
        onResolveCallback: Function[];  // 成功的回调数组
        onRejectCallback: Function[];   // 失败的回调数组
    
        // 构造函数
        constructor(executor:(resolve:(value?: any) => void, reject:(value?: any) => void) => void ) {
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
                        let x = onFulfilled( this.value );  // x 可能是一个 promise
                        // resolve( x ); // 用 then 的返回值，作为下一次 then 的成功结果
                        resolvePromise(promise2, x, resolve, reject);
                    }, (e) => {
                        reject(e);
                    });
                }
                // 判断当前的状态， 是不是失败
                if (this.status === STATUS.rejected) {
                    tryCatchFn(() => {
                        // 失败调失败
                        let x = onRejected( this.reason );
                        // resolve( x );
                        resolvePromise(promise2, x, resolve, reject);
                    }, (e) => {
                        reject(e);
                    });
                }
                // 判断当前的状态，是等待态
                if (this.status === STATUS.pending) {
                    // 订阅
                    this.onResolveCallback.push( () => { // 这种数组里的函数，叫做切片
                        tryCatchFn(() => {
                            // 这里的好处就是可以增加额外的逻辑
                            let x = onFulfilled( this.value );
                            // resolve( x );
                            resolvePromise(promise2, x, resolve, reject);
                        }, (e) => {
                            reject(e);
                        });
                    } );
    
                    this.onRejectCallback.push( () => {
                        // 这里的好处就是可以增加额外的逻辑
                        tryCatchFn(() => {
                            // 失败调失败
                            let x = onRejected( this.reason );
                            // resolve( x );
                            resolvePromise(promise2, x, resolve, reject);
                        }, (e) => {
                            reject(e);
                        });
                    } );
                }
            } );
    
            return promise2;
    
    
        }
    }
    
    export default Promise;
```
- bundle.js
```ts
    'use strict';
    
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
    // 核心的逻辑解析 x 的类型、来决定 promise2 起成功还是失败
    var resolvePromise = function (promise2, x, resolve, reject) {
        // console.log(promise2, x, resolve, reject);
        // 判断 x 的值决定 promise2 的关系，来判断有可能 x 是别人的 promise 可能是别人的 promise 会出现问题
        if (x === promise2) {
            return reject(new TypeError('出错了'));
        }
        // 判断 x 是一个对象或者是一个函数
        if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
            // 只有 x 是对象或者函数才有可能是 promise
            var called_1 = false; // 表示没有调用过成功和制作
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        // y 可能是一个 promise, 递归解析 y 的值，直到他是一个 普通为止
                        if (called_1)
                            return;
                        called_1 = true;
                        resolvePromise(promise2, x, resolve, reject);
                    }, function (r) {
                        if (called_1)
                            return;
                        called_1 = true;
                        reject(r);
                    });
                }
            }
            catch (e) {
                console.log(e);
                if (called_1)
                    return;
                called_1 = true;
                reject(e); // 走失败逻辑
            }
        }
        else {
            // 如果不是，那一定是一个普通值
            resolve(x);
        }
    };
    // 异常处理
    var tryCatchFn = function (resolve, reject) {
        setTimeout(function () {
            try {
                // 失败调失败
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }, 0);
    };
    // 一个 promise 有三个状态
    var Promise = /** @class */ (function () {
        // 构造函数
        function Promise(executor) {
            var _this = this;
            this.status = "PENDING" /* pending */; // 当前默认状态
            this.value = undefined; // 成功原因
            this.reason = undefined; // 失败原因
            this.onResolveCallback = []; // 成功的回调
            this.onRejectCallback = []; // 失败的回调
            // 成功的回调
            var resolve = function (value) {
                if (_this.status === "PENDING" /* pending */) { // 如果当前的状态是等待态，我就把下面的状态存起来
                    // 修改状态
                    _this.status = "FULFILLED" /* fulfilled */; // 修改成功的状态
                    _this.value = value; // 修改成功的原因
                    // 发布订阅方法
                    _this.onResolveCallback.forEach(function (fn) { return fn(); });
                }
            };
            // 失败的回调
            var reject = function (reason) {
                if (_this.status === "PENDING" /* pending */) {
                    _this.status = "REJECTED" /* rejected */; // 修改失败的状态
                    _this.reason = reason; // 修改失败原因
                    // 发布订阅方法
                    _this.onRejectCallback.forEach(function (fn) { return fn(); });
                }
            };
            // 捕获异常
            tryCatchFn(function () {
                executor(resolve, reject);
            }, function (e) {
                reject(e);
            });
        }
        // then 方法
        /**
         * onFulfilled
         * onRejected
         */
        Promise.prototype.then = function (onFulfilled, onRejected) {
            var _this = this;
            // 每次调用 then 都会产生一个全新的 promise
            var promise2 = new Promise(function (resolve, reject) {
                // 判断当前的状态，是不是成功
                if (_this.status === "FULFILLED" /* fulfilled */) {
                    tryCatchFn(function () {
                        // 成功调成功
                        var x = onFulfilled(_this.value); // x 可能是一个 promise
                        // resolve( x ); // 用 then 的返回值，作为下一次 then 的成功结果
                        resolvePromise(promise2, x, resolve, reject);
                    }, function (e) {
                        reject(e);
                    });
                }
                // 判断当前的状态， 是不是失败
                if (_this.status === "REJECTED" /* rejected */) {
                    tryCatchFn(function () {
                        // 失败调失败
                        var x = onRejected(_this.reason);
                        // resolve( x );
                        resolvePromise(promise2, x, resolve, reject);
                    }, function (e) {
                        reject(e);
                    });
                }
                // 判断当前的状态，是等待态
                if (_this.status === "PENDING" /* pending */) {
                    // 订阅
                    _this.onResolveCallback.push(function () {
                        tryCatchFn(function () {
                            // 这里的好处就是可以增加额外的逻辑
                            var x = onFulfilled(_this.value);
                            // resolve( x );
                            resolvePromise(promise2, x, resolve, reject);
                        }, function (e) {
                            reject(e);
                        });
                    });
                    _this.onRejectCallback.push(function () {
                        // 这里的好处就是可以增加额外的逻辑
                        tryCatchFn(function () {
                            // 失败调失败
                            var x = onRejected(_this.reason);
                            // resolve( x );
                            resolvePromise(promise2, x, resolve, reject);
                        }, function (e) {
                            reject(e);
                        });
                    });
                }
            });
            return promise2;
        };
        return Promise;
    }());
    
    module.exports = Promise;

```

- case5.js
```ts
    // 08-promise的链式解析(11-22)
      /**
       * promise 是支持链式调用的，
       * @type {Promise}
       *
       * 1、无论成功还是失败，都可以返回结果(1.出错了走错误，2、返回一个普通值（不是promise的值)，就会作为下一次 then 的成功, 3、是 promise 的情况，(会采用返回的 promise 的状态), 用promise 解析后的结果传递给下个人)
       *
       */
      const Promise1 = require('./bundle');
    
      const resultObj = {};
      let index = 0;
      Object.defineProperty(resultObj, 'then', {
          get(){
              throw new Error('出错了');
          }
      })
    
      // 1、普通值，调用 then 方法
      let promise = new Promise1((resolve, reject) => {
          resolve("成功");
      }).then(data => {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  resolve(new Promise((resolve,reject) => {
                      setTimeout(() => {
                          resolve(100);
                      }, 100);
                  }));
              }, 1000)
          })
      }, (err) => {
    
      });
    
    
      let promise2 = promise.then(data => {
          console.log("success: ",data);
      }, (err) => {
          console.log("fail: ",err, 9999)
      })
    
    

```