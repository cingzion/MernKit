const Promise = require('./bundle');
let p = new Promise((resolve, reject) => {
    resolve('ok');
});

// 以下这种方法叫穿透
p.then(data => data).then().then((data) => {
    console.log(data)
}, err => {
    console.log('e', err);
});