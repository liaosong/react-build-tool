## react项目构建工具

### 功能
1. 编译sass,es6
1. copy不需要编译的文件到dist
1. livereload,不需要刷新就能看到html和css变化后的效果
1. 打包文件到生产环境（未完成）
1. 反向代理api（未完成）

### 适用范围
该工具的设计目标是为一个多页面的网站提供代码打包等服务，融合了es6与react。对SPA未做优化。

### 思路

每一个页面都会加载他特定的js文件，该js文件即为该页面的js入口文件，通过es6的模块加载器来加载依赖。

sass的思路同js的加载原理。

### 约定
每个独立页面都对应一个以上的js文件，直接引入到html中得文件必须放到js文件夹下。js的入口文件需要到gulpfile里面去定义。
```
module_js: {index:'./app/js/index.js'}, //页面对应的js文件

```

每个页面也对应一个特定的css文件,同样通过sass的加载器来加载依赖css文件。

### 已知问题
1. 当jsx编译失败之后webpack并没有报错，文件也没通过编译，问题已提交至[webpack](https://github.com/webpack/webpack/issues/1640)
