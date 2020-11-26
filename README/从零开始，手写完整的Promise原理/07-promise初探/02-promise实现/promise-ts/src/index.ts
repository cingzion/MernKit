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
    reject = 'REJECTED',        // 标识变成失败态 rejected
 }
// 一个 promise 有三个状态
 class Promise {
    status: STATUS; // 状态
    value: any;     // 成功原因
    reason: any;    // 失败原因

    // 构造函数
    constructor(executor) {
        this.status = STATUS.pending;   // 当前默认状态
        this.value = undefined;         // 成功原因
        this.reason = undefined;        // 失败原因

        // 成功的回调
        const resolve = (value?: any) => {
            if(this.status === STATUS.pending) { // 如果当前的状态是等待态，我就把下面的状态存起来
                // 修改状态 
                this.status = STATUS.fulfilled; // 修改成功的状态
                this.value = value;             // 修改成功的原因
            }
        }

        // 失败的回调
        const reject = (reason?: any) => {
            if(this.status === STATUS.pending) {
                this.status = STATUS.reject;    // 修改失败的状态
                this.reason = reason;           // 修改失败原因
            }
        }

         // 捕获异常
         try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }

        
    }
 } 

 export default Promise;