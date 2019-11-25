/*
* @Author: Chen
* @Date:   2019-11-22 16:03:40
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-22 16:16:24
*/
//多次引入同一个文件只执行一次
/*
import './module.js'
import './module.js'
*/

//写法一 
/*
import {a,b} from './module.js'
console.log('a = ',a)
console.log('b = ',b)
*/

//写法二
/*
import {a,b} from './module.js'
console.log('a = ',a)
console.log('b = ',b)
*/

//写法三
/*
import {a as a1,b} from './module.js'
console.log('a1 = ',a1)
console.log('b = ',b)
*/

//写法四
/*
import {a1,b1} from './module.js'
console.log('a1 = ',a1)
console.log('b1 = ',b1)
*/

// import {a} from './module.js'
import a,{b} from './module.js'
console.log('a = ',a)
console.log('b = ',b)



console.log('here is index.js ...')