'use strict';

// Promise 都是基于回调模式的
/**
 * 高阶函数：
 *  1、如果你的函数参数是一个函数
 *  2、如果一个函数返回一个函数, 满足任何一个即可
 */
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
//}
/**
 * 在函数的原型上扩展一个方法
 *
 * @param fn
 */
Function.prototype.before = function (fn) {
    var _this = this;
    // 返回一个新的函数
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        fn(); // 先调用 before 方法
        _this.apply(void 0, args); // 在调用原有的 core 方法
    };
};
function core() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(['core....'], args));
}
var fn = core.before(function () {
    console.log('before core....');
});
fn(1, 2, 3); // 这里的参数，传递到 函数原型上面的 before 里面返回的一个函数里了
