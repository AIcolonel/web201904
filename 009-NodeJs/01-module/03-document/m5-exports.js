/*
* @Author: Chen
* @Date:   2019-10-23 15:49:53
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-24 10:17:51
*/

/*
console.log(exports)
console.log(module.exports)
console.log(exports === module.exports)
*/

const str = 'hello'
const obj = {
	name:'tom',
	age:18
}
const fn = ()=>{
	console.log('fn....')
}

/*
exports.str = str
exports.obj = obj
exports.fn = fn
*/
/*
module.exports.str = str
module.exports.obj = obj
module.exports.fn = fn
*/

//这样做法的结果就是将exports对象指针指向另一个新的对象
//此时则exports和module.exports就不是同一个对象了
/*
exports = {
	str,
	obj,
	fn
}
*/

console.log('reqiure m5')

module.exports = {
	str,
	obj,
	fn
}