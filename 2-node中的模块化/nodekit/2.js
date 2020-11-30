// 不算全局属性的全局属性
/**
 * __dirname
 * __filename
 * require
 * nodule
 * exports
 * 
 */

const { toUnicode } = require("punycode");

 // node 的模块化机制？(seajs(cmd) requirejs (amd 依赖前置))

 // 间例模式（无法保证命名冲突，变量名过长调用就不方便） iife 来解决模块化

 // 为什么需要模块化？（解决冲突，实现高内聚低耦合）
 // 现在最火的规范：commonjs 规范，esModule规范、 umd规范 (统一规范)、systemjs
/* 
let obj11122335433 = {
    fn(){

    }
}

let obj2 = {
    fn(){

    }
} 
*/


 // 依赖于 node 的特性，可以按需依赖，缺点，无法实现tree-shaking

 // es6 模块, 可能静态依赖，可以实现 tree-shaking 分析需要的依赖
    /* 
    if(true) {
        import 'xxx'
    }
    */
   
// commonjs 规范
/**
 * 1、每一个文件都是一个模块
 *      
 * 2、需要通过 module.exports 导出需要给别人使用的值
 *      module.exports = "xxx"; // 给别人使用
 * 
 * 3、通过 require 拿到了需要的结果
 */

 