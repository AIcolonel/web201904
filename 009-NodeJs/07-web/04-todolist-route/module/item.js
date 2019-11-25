/*
* @Author: Chen
* @Date:   2019-10-30 09:27:14
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-30 09:34:56
*/
const path = require('path')
const util = require('util')
const fs = require('fs')

const filePath = path.normalize(__dirname+'/../data/item.json')
//异步处理获取数据
const readfile = util.promisify(fs.readFile)
async function get(){
	//返回的数据已经处理成数组了
	const data = await readfile(filePath,{flag:'r',encoding:'utf8'})
	// console.log(data)
	return data
}
module.exports = {
	get
}