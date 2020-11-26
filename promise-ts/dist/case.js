const Promise = require('./bundle');

let promise = new Promise((resolve, reject) => {
    resolve("OK");
    throw new Error('失败');
});

promise.then((data) => {
    console.log("打印成功的结果是： ",data);
}, (err) => {
    console.log("打印失败的结果是： ",err);

});