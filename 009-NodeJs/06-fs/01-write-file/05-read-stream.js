/*
* @Author: Chen
* @Date:   2019-10-29 09:50:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-29 09:57:38
*/
const fs = require('fs')

const rs = fs.createReadStream('./05-rs.txt')


/*
//监听事件
//1.打开可读流=>2.读取流文件=>3.结束读取=>4.关闭流
rs.on('open',()=>{
	console.log('open read stream')
})
rs.on('close',()=>{
	console.log('close read stream')
})
rs.on('end',()=>{
	console.log('read file end')
})
//读取流文件
rs.on('data',(chunk)=>{
	console.log(chunk)
})
*/


