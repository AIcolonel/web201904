/*
* @Author: Chen
* @Date:   2019-10-29 09:57:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-29 10:04:43
*/
const fs = require('fs')

const rs = fs.createReadStream('./a.mp4')

const ws = fs.createWriteStream('./b.mp4')

//将读取的流写入文件
rs.pipe(ws)

/*
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

