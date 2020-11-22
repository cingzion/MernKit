// Promise 都是基于回调模式的

// 高阶函数 1、如果你的函数参数是一个函数，2、如果一个函数返回一个函数, 满足任何一个即可

// 基于原来的代码来扩展

// 给全局上添加一个属性

// 类型别名
type Callback = () => void;
type ReturnFn = (...args: any[]) => void;

//declare global {
    interface  Function { // 接口的合并
        before(fn: Callback): ReturnFn;
    }
// }
Function.prototype.before = function (fn){
    // this
    return (...args) => {
        fn();   // 先调用 before 方法
        this(...args); // 在调用原有的 core 方法
    }
}

const core = (a,b,c) => {
    console.log('core...', a, b, c);
}

const fn = core.before(() => {
    console.log('before core ...')
});

fn(1, 2, 3);

// 模块导出