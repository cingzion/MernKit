'use strict';

// 柯里化函数
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// 创建一个函数方法，做为类型的判断处理使用
/**
 * 我们借用了高阶函数，让一个大的范围函数，变成了一个范围小的函数，
 * 柯里化的功能 ，就是让函数的功能更具体些, 它的核心就是(保留参数)
 *     是把一个N个参数的函数，拆成了分布执行的函数。
 * 返柯里化，就是让函数范围变大 let toString Object.prototype.toString => toString.call(xxx);
 *
 * @param typing
 */
/*
function isType(typing: string) { // 高阶函数可以用于保存参数
    // 返回一个函数
    return function (val: unknown) {
        console.log("返回一个函数: ",Object.prototype.toString.call(val));
        // 返回一个函数类型字符:  [object String]
        // 返回一个函数类型字符:  [object Number]
        return Object.prototype.toString.call(val) === `[object ${typing}]`;
    }
}

// 声明一个数组
['String', 'Number', 'Boolean'].forEach(type => {
    // 使用 utils
    utils[`is${type}`] = isType(type); // 这里就是所谓的叫闭包
});

console.log("isString 输出的结果是：",utils.isString('123'));
console.log("isNumber 输出的结果是：", utils.isNumber(123));
*/
/***********************************************************
 * 第三版：柯里化函数
 **********************************************************/
/**
 * 实现一个通用的柯里化函数, 可以自动的将一个函数转换成多次传递参数
 * @param typing
 * @param val
 */
var curring = function (fn) {
    // 用数组记录传递过来的参数
    var exec = function (sumArgs) {
        // 如何当前传入参数的个数小于函数的参数个数，需要返回一个新的函数，并且保留当前传入的参数
        console.log("args: ", sumArgs);
        /*
        args:  []
        args:  [ 1 ]
        args:  []
        args:  [ 1 ]
        args:  [ 1, 2, 3 ]
        args:  [ 1, 2, 3, 4 ]
        -----------------------------
        args:  [ 1, 2, 3 ]
        args:  [ 1, 2, 3, 4 ]
         */
        return sumArgs.length >= fn.length ? fn.apply(void 0, sumArgs) : function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return exec(__spreadArrays(sumArgs, args));
        };
    };
    return exec([]); // 用于收集每次执行时传入的参数，第一次默认就是空的
};
/**
 * 一般做柯里，都是在参数固定的情况下做柯里化, 函数的长度就是参数的个数
 * @param a
 * @param b
 * @param c
 * @param d
 */
function sum(a, b, c, d) {
    return a + b + c + d;
}
var fn = curring(sum);
fn = fn(1);
var c = curring(sum)(1)(2, 3)(4);
console.log("curring 打印结果是：", c); // 打印结果是： 10
console.log("fn 打印结果是：", fn(2, 3)(4)); // 打印结果是： 10
function isType(typing, val) {
    return Object.prototype.toString.call(val) === "[object " + typing + "]";
}
var isString = curring(isType)('string');
var isNumber = curring(isType)('Number');
// 暂存变量
console.log("isString 打印结果是", isString); // isString 打印结果是 [Function (anonymous)]
console.log("isNumber 打印结果是", isNumber); // isNumber 打印结果是 [Function (anonymous)]
