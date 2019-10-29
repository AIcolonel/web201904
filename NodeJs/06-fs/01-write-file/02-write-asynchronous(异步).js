/*
* @Author: Chen
* @Date:   2019-10-28 11:21:59
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-28 16:02:23
*/

const fs = require('fs')
const util = require('util')
/*
//逐步操作
	//1.打开文件
	const fd = fs.open('./01.txt','w',(err,fd)=>{
		if(err){
			console.log('open fild failed')
		}else{
			//2.写文件
			fs.write(fd,'hello',(err)=>{
				if(err){
					console.log(err)
					console.log('write file failed')
				}else{
					console.log('write file success')
				}
				//3.关闭文件
				fs.close(fd,(err)=>{
					if(err){
						console.log('close file failed::',err)
					}else{
						console.log('close file success')
					}
				})
			})
			
		}
	})
*/


//合并操作
/*
fs.writeFile('./01.txt', 'hello world', {flag:'w'},(err)=>{
	if(err){
		console.log('write file failed')
		console.log(err)
	}
	else{
		console.log('write fild succes')
	}
})
*/

//3.promise处理异步写文件
const writefile = util.promisify(fs.writeFile)
writefile('./01.txt', 'hello world', {flag:'w'})
.then(data=>{
	console.log('write fild success')
})
.catch(err=>{
	console.log(err)
	console.log('write file err')
})

console.log('do something ....')
	
