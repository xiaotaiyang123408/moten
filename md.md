type:module
所有js文件为es，commonjs使用.cjs

type:commonjs
所以es模块使用.mjs

vue2 vue3 跨版本----VueDemi

pnpm i -r递归安装所有依赖

pnpm add -D vite-plugin-vue2    安装vue2
pnpm add -D @vitejs/plugin-vue  安装vue3

pnpm install 安装所有依赖的时候，不知道先安装的是vue2 vue3
pnpm解决版本问题
"pnpm": {
    "packageExtensions": {
      "vue-template-compiler": {
        "devDependencies": {
          "vue": "^2.7.16"
        }
      },
      "vue-template-compiler@2.7.16": {
        "devDependencies": {
          "vue": "^2.7.16"
        }
      }
    }
}
只走vue2版本，不走vue3的版本

"rimraf --glob ./node_modules ./packages/**/node_modules ./packages/**/dist"
清除命令

使用defineComponent来代替setup，因为defineComponent要比setup兼容性更好

### 防止样式污染
BEM命名法
scoped语法糖
使用影子DOM----window中的video是使用这种方式
iframe隔离

#### 该项目中使用scope来进行样式的隔绝
组件作用域css
会出现的问题：
使用scopeed来防止组件污染，，当组件进行全局重置时，因为不会在scoped中，所以可以在全局样式中再加一层包裹，这样可以规避一些样式污染

实现响应式设计---css媒体查询
media



#### 分析为啥没有使用iframe？

iframe 父组件通信 
后续维护比较困难

好处就是样式可以完全隔离--天然的沙盒

### 组件库如何进行版本适配
vue-demi动态进行版本切换
vite.config.js文件进行不同的版本导出，进行isvue2的判断进行不同的打包，注意要排除vue和vue-demi，因为再组件库开发的时候会用到scoped语法糖，宿主环境也会使用scoped语法糖，这导致在浏览器端相同组件会有不同的class命名，所以将其进行排除
当涉及到逻辑处理时，使用defineComponent来进行配置，代替setup

### husky
pnpm add lint-staged
pnpm add -D cz-vinyl
commitlint/cli

