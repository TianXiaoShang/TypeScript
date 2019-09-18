// 关于ts中的模块化，在编译结果中的行为：
// --如果编译结果的模块化标准（tsconfig中的module配置）是ES6： 则没有区别
// --如果编译结果的模块化标准是commonjs：导出的生命会变成exports的属性，默认导出则给export挂一个叫default的属性。最终通过require导入使用：
export const name = 'xiaoshangshang'

export function sum(a: number, b: number): number {
    return a + b
}

export default function () {
    console.log('默认导出情况')
}


// 需要注意的是，在使用commonjs规范时，比如下引入fs等会报错:
// -- import fs from 'fs'

// 原因是fs并非迎合ts写的，所以并不一定符合我们的用法，事实上fs他的导出是module.export = {}
// 当我们使用fs.readFileSync()时最终编译的结果却是fs.default.readFileSync()，default上找不到该方法则报错；
// 我们需要的是去fs本身上找readFildeSync方法，此时我们可以如下：
// -- import { readFileSync } from 'fs'

// 但是当方法多的时候一个个写同样会很麻烦，于是有了下面这种更完美的写法：
// -- import * as fs from 'fs'
// -- fs.readFileSync('./')        //这样就不会报错了

// 而如上这两个写法都可以使用一个配置来代理。使得可以直接使用 import fs from 'fs'；
// -- "esModuleInterop": true,         //启用es模块化交互非es模块导出

// 总是在ts书写代码时统一使用es6标准来导入和导出。最为科学。


/**
 * 如何在ts中使用commonjs规范书写ts代码（都说了最好用es6模块化，如果你非要用commonjs咋办？）
 * 你有毛病吧，自己滚去看第五章第四节！
 */