let promise = new Promise((resolve, reject) => {
    throw new Error('失败');
});

promise.then((data) => {}, (err) => {

});