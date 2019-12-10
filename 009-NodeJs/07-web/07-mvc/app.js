/*
* @Author: Chen
* @Date:   2019-10-29 11:08:52
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-31 09:38:33
*/
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const swig = require('swig')
const querystring = require('querystring')


const mime = require('./mime.json')
const { get,add,del } = require('./model/item.js')

const server = http.createServer((req,res)=>{
	const parse = url.parse(req.url,true)
	//请求的路由地址
	const pathname = parse.pathname

	/*约定
		以/static/开始的请求的都是静态支援
		反之则请求的是具体的路由地址
		路由的格式:/Controller/action/arg1/arg2
		地址以什么开始引入startsWith方法
	*/
	if(pathname.startsWith('/static/')){
		const filePath = path.normalize(__dirname+'/'+req.url)
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
	else{//处理具体路由
		//解析路由
		const paths = pathname.split('/')
		const controller = paths[1] || 'Index'
		const action = paths[2] || 'index'
		const args = paths.splice(3)
		// console.log('controller::',controller)
		// console.log('action::',action)
		// console.log('args::',args)

		/*约定
			所有的Controller文件都保存在./controller目录下面
		*/
		const model = require(path.normalize(__dirname+'/controller/'+controller))
		// console.log(model)

		//拿到实例上的方法并执行,将req,res,和参数信息传进去
		//为了防止拿不到对应的文件报错一下语句放到try...catch中
		try{
			model[action] && model[action](...[req,res].concat(args))
		}catch(err){
			res.setHeader('Content-type','text/html;charset=UTF-8')
			res.statusCode = 404
			res.end('<h1>请求的地址出错啦</h1>')
		}
		

		// res.end('doing ...')
	}






	/*
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
			add(query.task)
			.then(data=>{
				//3.返回最新的数据
				res.end(JSON.stringify({
					code:0,
					message:'添加成功',
					data:data
				}))
			})
			.catch(err=>{//添加失败处理
				res.end(JSON.stringify({
					code:10,
					message:'添加数据失败',
					data:err
				}))
			})
		})
	}
	//3.处理删除
	else if(pathname == '/delete'){//GET
		//1.获取参数信息
		const id = parse.query.id
		// console.log(id)
		//2.根据参数信息删除文件中对应数据
		del(id)
		.then(()=>{
			//3.返回成功信息
			res.end(JSON.stringify({
				code:0,
				message:'删除成功'
			}))
		})
		.catch(err=>{
			//3.返回失败信息
			res.end(JSON.stringify({
				code:1,
				message:'删除失败'
			}))
		})
		
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
	*/
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://17.0.0.1:3000')
})