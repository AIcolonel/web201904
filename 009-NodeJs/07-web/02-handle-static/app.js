/*
* @Author: Chen
* @Date:   2019-10-29 11:08:52
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-29 11:55:13
*/
const http = require('http')
const path = require('path')
const fs = require('fs')
const mime = require('./mime.json')

const server = http.createServer((req,res)=>{
	// console.log(req.url)
	// const filePath = './'+req.url
	//处理静态资源
	const filePath = path.normalize(__dirname+'/static/'+req.url)
	// console.log(filePath)
	fs.readFile(filePath,(err,data)=>{
		if(err){
			res.setHeader('Content-type','text/html;charset=UTF-8')
			res.statusCode = 404
			res.end('<h1>请求的地址出错啦</h1>')
		}else{
			//根据扩展名设置文档类型(第二节)
			//.css text/css
			//.html text/html
			const extname = path.extname(req.url)
			const mimeType = mime[extname]
			// console.log(mimeType)
			res.setHeader('Content-type',mimeType+';charset=UTF-8')
			res.end(data)
		}
	})




	// res.end('good')
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://17.0.0.1:3000')
})
