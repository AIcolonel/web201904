/*
* @Author: Chen
* @Date:   2019-10-23 15:54:11
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-23 15:59:19
*/
// const req = require('./exports.js')
//导入文件返回的始终是module.exports对象
const {str,obj,fn} = require('./exports.js')

/*
console.log(req.str)
console.log(req.obj)
console.log(req.fn)
req.fn()
*/
console.log(str)
console.log(obj)
console.log(fn)
// fn()