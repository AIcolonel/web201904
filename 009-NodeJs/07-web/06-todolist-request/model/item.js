/*
* @Author: Chen
* @Date:   2019-10-30 09:27:14
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-30 15:44:59
*/
const path = require('path')
const util = require('util')
const fs = require('fs')

const filePath = path.normalize(__dirname+'/../data/item.json')
//异步处理获取数据
const readfile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


async function get(){
	//返回的数据需要转化成数组了
	const data = await readfile(filePath,{flag:'r',encoding:'utf8'})
	// console.log(data)
	const arr = JSON.parse(data)
	return arr
}

//异步处理添加数据
async function add(task){
	//1.读取文件(切记添加await,否则报错)
	const data = await readfile(filePath)
	//2.将读取文件数据转化成数组
	const arr = JSON.parse(data)
	//3.生成任务对象并添加到数组中
	const obj = {
		id:Date.now().toString(),
		task:task
	}
	arr.push(obj)
	//4.将最新的数组再次转化成字符串覆盖写入到文件中
	//(要用await等待写入成功)
	await writeFile(filePath,JSON.stringify(arr))
	//5.返回任务对象
	return obj
}

//异步处理删除数据
async function del(id){
	//1.读取文件(切记添加await,否则报错)
	const data = await readfile(filePath)
	//2.将读取文件数据转化成数组
	const arr = JSON.parse(data)
	//3.根据id删除数组中的对应数据并生成新的数组
	const newArr = arr.filter(item=>{
		return item.id != id
	})
	//4.将最新的数组再次转化成字符串覆盖写入到文件中
	//(要用await等待写入成功)
	await writeFile(filePath,JSON.stringify(newArr))
}


module.exports = {
	get,
	add,
	del,
}