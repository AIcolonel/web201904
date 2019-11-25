/*
* @Author: Chen
* @Date:   2019-10-28 11:00:12
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-28 11:11:19
*/

const fs = require('fs')
//同步写文件

//逐步操作
	/*
	//1.打开文件
	const fd = fs.openSync('./01.txt','a')
	//2.写文件
	// console.log(fd)
	fs.writeSync(fd,'hello')
	//3.关闭文件
	fs.closeSync(fd)
	*/

//合并操作
	fs.writeFileSync('./01.txt', 'hello world', {flag:'a'})