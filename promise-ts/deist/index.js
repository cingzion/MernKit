// Promise 都是基于回调模式的
/**
 * 高阶函数：
 *  1、如果你的函数参数是一个函数
 *  2、如果一个函数返回一个函数
 */


// 基于原来的代码扩展

// 在函数的原型上扩展一个方法
Function.prototype.before = function(fn) {

    // 返回一个新的函数
    return (...args) => {
        fn(); // 先调用 before 方法
        this(...args); // 在调用原有的 core 方法
    }
}
function core() {
    console.log('core....')
}

let fn = core.before(() => {
    console.log('bbefore core....')
})

fn(1, 2, 3); // 这里的参数，传递到 函数原型上面的 before 里面返回的一个函数里了

