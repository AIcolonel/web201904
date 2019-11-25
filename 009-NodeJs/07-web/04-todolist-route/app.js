/*
* @Author: Chen
* @Date:   2019-10-29 11:08:52
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-30 09:37:27
*/
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')


const mime = require('./mime.json')
const {get} = require('./module/item.js')

const server = http.createServer((req,res)=>{
	// console.log(req.method+":::"+req.url)
	const parse = url.parse(req.url,true)
	// console.log(parse)
	//请求的路由地址
	const pathname = parse.pathname
	//根据路由地址进行不同处理
	//1.处理首页路由 / /index.html
	if(pathname == '/' || pathname == '/index.html'){
		//获取首页数据
		get()
		.then(data=>{
			//将数据通过模板渲染到页面中
			const filePath = path.normalize(__dirname+'/static/index.html')
			fs.readFile(filePath,(err,data)=>{
				if(err){
					res.setHeader('Content-type','text/html;charset=UTF-8')
					res.statusCode = 404
					res.end('<h1>请求的地址出错啦</h1>')
				}else{
					res.setHeader('Content-type','text/html;charset=UTF-8')
					res.end(data)
				}
			})
		})

		
	}
	//2.处理添加
	else if(pathname == '/add'){
		console.log('add...')
		res.end(JSON.stringify({
			code:0
		}))
	}
	//3.处理删除
	else if(pathname == '/delete'){

	}
	//4.处理静态资源
	else{
		const filePath = path.normalize(__dirname+'/static/'+req.url)
		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-type','text/html;charset=UTF-8')
				res.statusCode = 404
				res.end('<h1>请求的地址出错啦</h1>')
			}else{
				//根据扩展名设置文档类型
				//.css text/css
				//.html text/html
				const extname = path.extname(req.url)
				const mimeType = mime[extname]
				res.setHeader('Content-type',mimeType+';charset=UTF-8')
				res.end(data)
			}
		})
	}
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://17.0.0.1:3000')
})
