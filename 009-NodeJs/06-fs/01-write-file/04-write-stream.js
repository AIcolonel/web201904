/*
* @Author: Chen
* @Date:   2019-10-29 09:43:44
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-29 09:50:14
*/
const fs = require('fs')

const ws = fs.createWriteStream('./04-ws.txt')


//1.打开可写流=>2.写入流=>3.结束写入=>4.关闭流
ws.on('finish',()=>{
	console.log('write file finish')
})
ws.on('open',()=>{
	console.log('open write stream')
})
ws.on('close',()=>{
	console.log('close write stream')
})
ws.write('hello')
ws.write('good')

ws.end('write file end')