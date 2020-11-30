console.log(global); // 全局上可以直接方问的属性我们叫它全局变量

/*
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
*/

// 所有模块都可以直接方问到以下 5 个变量但是它并不是 global 上的
/**
 * __dirname
 * __filename
 * require
 * nodule
 * exports
 */
console.log(global); // setTimeout queueMicrotask（setImmediate)
console.log(global.process); // process 代表进程，可以获得运行时一些环境和参数

console.log("=====================");

console.log(Object.keys(process));
/*
 输出的结果如下：
    
  'version',
  'versions',
  'arch',
  'platform',
  'release',
  '_rawDebug',
  'moduleLoadList',
  'binding',
  '_linkedBinding',
  '_events',
  '_eventsCount',
  '_maxListeners',
  'domain',
  '_exiting',
  'config',
  'dlopen',
  'uptime',
  '_getActiveRequests',
  '_getActiveHandles',
  'reallyExit',
  '_kill',
  'cpuUsage',
  'resourceUsage',
  'memoryUsage',
  'kill',
  'exit',
  'openStdin',
  'getuid',
  'geteuid',
  'getgid',
  'getegid',
  'getgroups',
  'allowedNodeEnvironmentFlags',
  'assert',
  'features',
  '_fatalException',
  'setUncaughtExceptionCaptureCallback',
  'hasUncaughtExceptionCaptureCallback',
  'emitWarning',
  'nextTick',
  '_tickCallback',
  '_debugProcess',
  '_debugEnd',
  '_startProfilerIdleNotifier',
  '_stopProfilerIdleNotifier',
  'stdout',
  'stdin',
  'stderr',
  'abort',
  'umask',
  'chdir',
  'cwd',
  'initgroups',
  'setgroups',
  'setegid',
  'seteuid',
  'setgid',
  'setuid',
  'env',
  'title',
  'argv',
  'execArgv',
  'pid',
  'ppid',
  'execPath',
  'debugPort',
  'hrtime',
  'argv0',
  '_preload_modules',
  'mainModule'
]
*/
/**
 * process下面的内容：
 *  platform win32 => window mac => darwin 每个平台找一些用用户文件，位置可能不一样
 * 
 *  写一个工具，获取用户的目录
 *  chdir cwd env argv 
 * 
 *  cwd current working directory 当前工作目录, 运行时产生的一个路径，指向在哪里执行(可以改变)
 *  
 * 
 */
console.log("============cwd=================");
console.log(process.cwd()); 
/**
 * 输出的结果如下：
 * 
 * /Users/liangchengjin/Folder/Codes/MernKit
 */ 
process.chdir('../../../');  // 修改当前目录的路径
console.log(process.cwd());  // 输出的目录路径：/Users/liangchengjin
console.log(__dirname);      // 绝对路径，指代的是当前文件所在的目录
/**
 * 重点说明：
 *      相对路径，相对 的是工作目录，不是当前文件所在的目录
 * 
 *      如果是一个确定路径，我们都使用绝对路径
 */


console.log("========2、设置环境变量=======");
/**
 * 2、环境变量
 *  .env 默认会读取全局的(临时设置变量) cross-env 是第三方模块
 *  set NODE_ENV=development
 *  export NODE_ENC=develompent  powershell mac
 * 
 *  $ cross-env a=b node 1.js
 */
console.log(process.env.NODE_ENV); // npm i cross-env -g
// 可以根据不同环境设置环境变量

 // onsole.log(Buffer); // 主要用于文件操作


 console.log("==========3、argv===========");
 /**
  * 3、argv 用户执行时传递的参数
  *     process.argv[0] // node 的可执行文件
  *     process.argv[1] // node  执行的文件是谁
  *     ...other 就是用户传递的参数 => 进行参数解析
  */

console.log(process.argv); // webpack --port 3000 --config webpack.config.js
// 如： node .js --port 3000 --config webpack.config.js

let program = {};
process.argv.slice(2).forEach((item, index, array) => {
    console.log("每一项：" , );
    if(item.startsWith('--')){
        program[item.slice(2)] = array[index+1];
    }
})
console.log("输出的结果是：",program);

// 包： commander 命令行管家 git、npm, 安装 yarn add commander
console.log("=====commander=====");
const programa = require('commander');
// 脚手架，工程化工具，解析用户的各种参数
programa.option('-p, --port <n>', 'set user port');
programa.option('-c, --config <n>', 'set user port file');
// 删除
programa.command('rmdir').description('remove dir').action(() => {
    console.log('create project');
});

// 创建
programa.command('create').description('create project').action(() => {
    console.log('create project');
});

// on 是监听--hellp 事件 来输出的信息
/**
 * 文档查看：npmjs.org 
 */
programa.on('--help', () => {
    console.log('\nSee web site for more information.');
})


programa.parse(process.argv);
/**
 * 1、学习总结
 *      process.env
 *      process.argv
 *      process.platform
 *      process.cwd()
 *      __dirname
 * 
 * 2、nextTick
 *     
 * 
 * https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
 */
// node 事件环(setTimeout => nextTick => promise) 
// 浏览器和 Node 事件循环在 node 10 版本(执行结果不一样) 本质上不一样
// 浏览器，宏任务、微任务
// node 中多多个宏任务队列

// 默认是先从上到下依次执行代码, 依次清空每个队列中的回调方法，每调用一个宏任务后都 会清空微任务
// 宏任务 （老版本中，是每清空完毕后一个队列后才会去执行微任务）
// timers 存放所有定时器回调的 []
// poll 阶段，主要存放的异步的 i/o 操作，node 基本上所有的异步 api 的回调都会在这个阶段来处理 []
// check 是存放 setImmediate 的回调s []

// 主栈 => 检测时间又没有到达的定时，有就执行(清空任务) => 下一个阶段是 poll(i/o操作) => 也就逐一清空 => 看 setImmediate 队列中是否有内容，如果有内容 则清空 check 阶段，如果没有就在这阻塞 => 不停的看定时器中有没有到达时间，如果有则回去继续执行

setTimeout(() => {
    console.log('timeout');
}, 0);

Promise.resolve().then(data => {
    console.log('then');
});

// process.nextTick() 优先级高于 微任务
process.nextTick(() => {
    console.log('nextTick');
})
console.log('ok');

console.log("========setTimeout 与 setImmediate 的对比");
console.time('start');
setImmediate(() => {
    console.log('setImmediate');
});

setTimeout(() => {
    console.log('timeout');
}, 0); // 受性能影响，需要看循环的时候 setTimeout 是否被放到了队列中，是优先于 setImmediate 还是在 setImmediate 之后


// timeout_vs_immediate.js
const fs = require('fs');
fs.readFile(__dirname, () => {
    console.log(1);

    setTimeout(() => { // timer
        console.log('timeout');
    }, 0);

    console.log(2);
    
    setImmediate(() => { // check
        console.log('immediate');
    });
    console.log(3);
});

// 其它的执行结果和浏览器是一至的(浏览器的角度去想)


