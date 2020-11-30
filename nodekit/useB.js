const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');


function Module() {

}

Module._resolveFilename = function (id) {
    let filePath = path.resolve(__dirname, id);

    // 我应该看一下这个文件路径是否存在，如果不存在尝试添加后缀
    let isExsits = fs.existsSync(filePath);
    if(isExsits) return filePath; // 文件存在直接返回
    let keys = Object.keys(Nodule._extends);

    for(let i = 0; i < keys.length; i++) {
        let newFilePath = filePath + key[i];
        if(fs.existsSync(newFilePath)) return newFilePath;
    }

    throw new Error('模块文件不存在');
    console.log(filePath);
}

// 内部可能有 n 种解析规则
Module._extends = {
    '.js'(){},
    '.json'(){}
}

Module.prototype.load = function () {
    // 核心的加载 ，根据文件不同的rgxc进行加载
    let extname = path.extname(this.id)
;
}

Module._load = function() {
    let filename = Module._resolveFilename(id); // 就是将用户的路径变成绝对路径
}

function req(id){ // 根据用户名加载模块
    return Module._load(id);
}


const r = require('./b');
console.log(r);

// node --inspect-back 文件名
// chrome://inspect/

// vscode 直接进行调试

// require 是一个 Module 原型上的方法 Module.prototype.require
// 


