/*
* @Author: Chen
* @Date:   2019-11-06 09:34:49
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 15:49:12
*/
const mongoose = require('mongoose')
const UserModel = require('./models/user.js')
const BlogModel = require('./models/blog.js')
const moment = require('moment')

//链接数据库
// mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/kuazhu', { useUnifiedTopology: true })

//生成db
const db = mongoose.connection

//数据库链接失败
db.on('error',()=>{
	console.log('connection error')
	throw 'connection error'
})
//操作数据库
db.once('open', function() {
	//3.根据文档模型操作数据(CRUD)
	

	//构建模拟数据
	/*
	UserModel.insertMany({
		name:"Peter",
		age:20,
		major:"Art",
		phone:13230155689
	})
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log(err)
	})
	
	BlogModel.insertMany({
		title:"blog2",
		content:"this is a best blog2",
		author:"5dc23ca7e74c180bec84c6d1"
	})
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log(err)
	})
	*/

	//根据博客标题获取详细的博客信息和用户信息
	/*
	BlogModel.findOne({title:"blog1"})
	.then(blog=>{
		let result = {}
		result.blog = blog
		// console.log(blog)
		UserModel.findById(blog.author,(err,user)=>{
			if(err){
				console.log(err.message)
			}else{
				// console.log(user)
				result.user = user
				console.log(result)
			}
		})
	})
	.catch(err=>{
		console.log(err)
	})
	*/

	/*
	BlogModel.findOne({title:"blog1"})
	.populate('author','name -_id')
	.then(data=>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err)
	})
	*/

	BlogModel.findBlogs({title:"blog1"})
	.then(data=>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err)
	})

	
})