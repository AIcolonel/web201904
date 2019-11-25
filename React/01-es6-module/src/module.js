/*
* @Author: Chen
* @Date:   2019-11-22 16:06:06
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-22 16:17:01
*/
console.log('here is module.js ...')
//写法一
/*
export const a = 1
export const b = 2
*/

//写法二
/*
const a = 1
const b = 2
export {a,b}
*/

//写法三
/*
const a = 1
const b = 2
export {
	a,
	b
}
*/

//写法四
/*
const a = 1
const b = 2
export {
	a as a1,
	b as b1
}
*/

//写法五
export const b = 456
export default 123
// export default 456
// export default const a = 123