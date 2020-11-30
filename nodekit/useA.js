let r = require('./a');
console.log(r);

// commonjs 原理, require 时同步的，不是一异步的
    /* 
    let r = (function() {
        module.exports = 'hello';

        return module.exports;
    })(module, exports, require, __dirname, __filename); 
    */

// commonjs 规范：三种模块
// 这种方式叫：自定义模块、文件模块 / 第三方模块 / 内置模块和核心模块

// 使用内置模块
/**
 *  node 中自的不需要安装，引用的时候 不需要添加路径
 */
const fs = require('fs'); // 核心模块
// 读取文件
// let r1 = fs.readFileSync('./1.js', 'utf8'); // 同步读取
// let r2 = fs.readFileSync('./1.js', ); // 同步判断是否存在的方法

const path = require('path'); // 处理路径

// 此时可以传入解析的路径来查找到, path.resolve 不要碰到 / 否購会回到根路径下
console.log(__dirname, '1.js', '2.js', '/'); // 解析出一个绝对路径，默认以 process.cwd() 解析

// process.cwd() 解析
console.log(path.join(__dirname, 'a', 'b', '/')); // join 和 resolve 可以互换使用但是有 / 的话不能使用 join 会跑到根路径下

console.log(path.extname('a.mim.js'));    // 取扩展中的方法,取 .js
console.log(path.relative('a', 'a/b/1.js')); // 相减取，差异的部分
console.log(path.dirname('a/b.js')); // 取目录名 __dirname


const vm = require('vm'); // 很少用，就是可以执行字符串代码

// let a = 1;
// eval(`console.log(a)`); eval 执行时不会产生沙箱机制，会依赖外层的变量

// let fn = new Function(`console.log(a));
// fn();

vm.funInThisContext(`console.log()`); // 运行方式 同 new Function不需要把字符串包装成函数



