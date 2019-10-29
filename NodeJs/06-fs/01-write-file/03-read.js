/*
* @Author: Chen
* @Date:   2019-10-28 11:51:42
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-28 16:08:05
*/
const fs = require('fs')
const util = require('util')
//同步操作
	//1.逐步操作
		/*
		//打开文件
		const fd = fs.openSync('./01.txt','r')
		//读取文件
		let buf = Buffer.alloc(100)
		fs.readSync(fd,buf,0,50,1)
		console.log(buf)
		//关闭文件
		fs.closeSync(fd)
		*/


	//2.合并操作
		/*
		const buf = fs.readFileSync('./01.txt',{flag:"r",encoding:'utf8'})
		console.log(buf)
		*/

//异步操作
	//1.逐步操作
		//打开文件
		/*
		fs.open('./01.txt','r',(err,fd)=>{
			if(err){
				console.log('open file err::',err)
			}else{
				//读取文件
				let buf = Buffer.alloc(100)
				fs.read(fd,buf,0,50,0,(err)=>{
					if(err){
						console.log('read file err::',err)
					}else{
						console.log(buf)
					}
					//关闭文件
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
	fs.readFile('./01.txt',{flag:'r',encoding:'utf8'},(err,data)=>{
		if(err){
			console.log('read file failed')
			console.log(err)
		}else{
			console.log(data)
		}
	})
*/


//promise处理异步读文件
	const readfile = util.promisify(fs.readFile)
	readfile('./01.txt',{flag:'r',encoding:'utf8'})
	.then(data=>{
		// console.log('read fild success')
		console.log(data)
	})
	.catch(err=>{
		console.log(err)
		console.log('read file err')
	})

