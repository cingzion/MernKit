#### 07-promise初探

- 01、promise初探
```ts
    /**
     *
     * 1、promise 可以解决多个异步并行执行，最终得到所有的结果
     * 2、异步嵌套问题
     */
    
    /**
     * 1、每个 promise 都有三个状态
     *      -1：pending 等待态
     *      -2：resolve 标识变成、成功态
     *      -3：fulfilled reject 标识变成失败态 rejected
     *
     * 2、每个 promise 需要有一个 then 方法，传入两个参数
     *      一个是成功的回调
     *      另一个是失败的回调
     * 3、new Promise 会立即执行
     *
     * 4、一旦成功就不能"失败"，一旦失败就不能"成功", 状态不可逆行
     *
     * 5、当 promise 抛出异常后，也会走失败态
     *     Promise a+ 规范：https://promisesaplus.com
     */
    let promise = new Promise((resolve, reject) => {
        /**
         * resolve 成功的函数
         * reject 失败的函数
         *
         * 说明：什么时候会走成功呢？当你去调用 resolve 的时候
         *     重点：当执行成功的函数，就不能执行失败的函数，两种回调，只会出现一次
         */
        reject('OK')
    });
    
    // 每一个 Promise 上面都有一个 then 方法, 这个 then 传的是一个成功的回调和一个失败的回调
    promise.then((data) => { // 成功的回调
        console.log("成功的值 success：", data); // 成功的值 success： OK
    }, (err) => { // 失败的回调
        console.log("失败的值 filled：", err); // 失败的值 filled： OK
    
    })
    

```
