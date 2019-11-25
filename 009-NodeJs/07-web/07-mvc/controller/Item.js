/*
* @Author: Chen
* @Date:   2019-10-30 18:06:12
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-31 09:59:05
*/
const path = require('path')
const swig = require('swig')
const querystring = require('querystring')

const { get:getItem,add:addItem,del:delItem } = require('../model/item.js')


//处理具体的路由
class Controller {
	index(req,res,...args){
		//获取首页数据
		getItem()
		.then(data=>{
			//将数据通过模板渲染到页面中
			const filePath = path.normalize(__dirname+'/../view/item/index.html')
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
	add(req,res,...args){
		//1.获取参数
		let body = ''
		req.on('data',(chunk)=>{
			body += chunk
		})
		req.on('end',()=>{
			//2.生成任务对象并写入到数据文件中
			const query = querystring.parse(body)
			//调用添加方法
			addItem(query.task)
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
	delete(req,res,...args){
		//1.获取参数信息
		const id = args[0]
		// console.log(id)
		//2.根据参数信息删除文件中对应数据
		delItem(id)
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
}

module.exports = new Controller()