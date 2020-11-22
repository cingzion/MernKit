#### 环境搭建
- 1、创建一个目录，并进入： `mkdir promise-ts && cd promise-ts`
- 2、安装相关插件： `npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D`
- 3、增加配置文件： `npm tsc --init`
    + 生成后的文件 `tsconfig.json`
- 4、创建一个 rollup.config.js 文件：`touch rollup.config.js`
- 5、全局安装：`npm install -g ts-node` 运行 .ts 的文件

#### 配置后的文件
```jsx harmony
    // package.json
        {
          "name": "promise-ts",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "dev": "rollup -c -w"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "dependencies": {
            "rollup": "^2.33.3"
          },
          "devDependencies": {
            "@rollup/plugin-node-resolve": "^10.0.0",
            "rollup-plugin-serve": "^1.1.0",
            "rollup-plugin-typescript2": "^0.29.0",
            "typescript": "^4.1.2"
          }
        }

    // tsconfig.json
        {
          "compilerOptions": {
            /* Visit https://aka.ms/tsconfig.json to read more about this file */
        
            /* Basic Options */
            // "incremental": true,                   /* Enable incremental compilation */
            "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
            "module": "ESNext",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
            // "lib": [],                             /* Specify library files to be included in the compilation. */
            // "allowJs": true,                       /* Allow javascript files to be compiled. */
            // "checkJs": true,                       /* Report errors in .js files. */
            // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
            // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
            // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
            // "sourceMap": true,                     /* Generates corresponding '.map' file. */
            // "outFile": "./",                       /* Concatenate and emit output to single file. */
            // "outDir": "./",                        /* Redirect output structure to the directory. */
            // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
            // "composite": true,                     /* Enable project compilation */
            // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
            // "removeComments": true,                /* Do not emit comments to output. */
            // "noEmit": true,                        /* Do not emit outputs. */
            // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
            // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
            // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
        
            /* Strict Type-Checking Options */
            "strict": false,                           /* Enable all strict type-checking options. */
            // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
            // "strictNullChecks": true,              /* Enable strict null checks. */
            // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
            // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
            // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
            // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
            // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
        
            /* Additional Checks */
            // "noUnusedLocals": true,                /* Report errors on unused locals. */
            // "noUnusedParameters": true,            /* Report errors on unused parameters. */
            // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
            // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
            // "noUncheckedIndexedAccess": true,      /* Include 'undefined' in index signature results */
        
            /* Module Resolution Options */
            // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
            // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
            // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
            // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
            // "typeRoots": [],                       /* List of folders to include type definitions from. */
            // "types": [],                           /* Type declaration files to be included in compilation. */
            // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
            "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
            // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
            // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */
        
            /* Source Map Options */
            // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
            // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
            // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
            // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
        
            /* Experimental Options */
            // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
            // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
        
            /* Advanced Options */
            "skipLibCheck": true,                     /* Skip type checking of declaration files. */
            "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
          }
        }

    // rollup.config.js
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
    
    // promise-ts/src/index.ts
        let str: string = 'jean';
        console.log(str)

    
```

