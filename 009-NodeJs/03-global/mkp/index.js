/*
* @Author: Chen
* @Date:   2019-10-25 09:06:06
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-28 16:49:03
*/
 //#!/usr/bin/env node
const fs = require('fs')
// console.log(process.argv)
//指定项目名称,创建前端项目目录结构
function mkp(){
	//1.获取项目名称
	const filename = process.argv[2]
	//2.根据名称创建项目目录
	fs.mkdirSync('./'+filename)
	fs.mkdirSync('./'+filename+'/css')
	fs.mkdirSync('./'+filename+'/js')
	fs.mkdirSync('./'+filename+'/img')
}

// module.exports = mkp
mkp()
console.log('hello world')
