/*
* @Author: Chen
* @Date:   2019-10-29 11:08:52
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-30 11:06:55
*/
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const swig = require('swig')
const querystring = require('querystring')


const mime = require('./mime.json')
const { get,add } = require('./model/item.js')

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
			//引入模板(返回一个模板函数)
			const template = swig.compileFile(filePath)
			const html = template({
				data:data
			})
			// console.log(html)
			res.setHeader('Content-type','text/html;charset=UTF-8')
			res.end(html)
		})
		.catch(err=>{
			res.setHeader('Content-type','text/html;charset=UTF-8')
			res.statusCode = 404
			res.end('<h1>请求的地址出错啦</h1>')
		})
	}
	//2.处理添加
	else if(pathname == '/add'){//POST
		//1.获取参数
		let body = ''
		req.on('data',(chunk)=>{
			body += chunk
		})
		req.on('end',()=>{
			//2.生成任务对象并写入到数据文件中
			const query = querystring.parse(body)
			//调用添加方法
			
			//3.返回最新的数据
			
		})
		
		
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
