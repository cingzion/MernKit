import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: {
        format: 'cjs', // commonjs 规范 umd esm iife
        file: path.resolve(`deist/bundle.js`)// 打包后的路径
    },
    plugins: [
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json') // 解析的时候用到 tsconfig.json 的文件
        }),
        nodeResolve({
            extensions:['.js','.ts']
        }),

    ]
}