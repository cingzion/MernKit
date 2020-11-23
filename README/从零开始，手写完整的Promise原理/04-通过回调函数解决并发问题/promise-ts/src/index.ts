// 04-通过回调函数解决并发问题
/**
 * Promise 最重要的核心，就是解决了，
 *  1、异步并发问题
 *  2、回调地域问题，回调函数
 *
 *
 */

const fs = require('fs'); // 可以读取文件

// 接口
interface IPerson {
    age: number;
    name: string;
}


function after(times, callback) { // 高阶函数，可以暂存变量
    /**
     * times 是时间
     * callback 是一个回调函数
     */
    let obj = {} as IPerson;
    return function(key: string, val: string | number){
        /**
         * key 是 fn() 里面的第一个参数
         * val 是 fn() 里面的第二个参数
         */
        obj[key] = val;
        --times === 0 && callback(obj);
    }
}

let fn = after(2, (obj) => {
    console.log(obj);
});

fs.readFile('./age.txt', 'utf8', (err, data): any => {
    console.log("打印的结果是：", data);
    fn('age', data); // 调用 fn 的函数
});


fs.readFile('./name.txt', 'utf8', (err, data): any => {
    console.log("打印的结果是: ",data);
    fn('name', data); // 调用 fn 的函数
});

// 发布订阅模式 => 观察者模式