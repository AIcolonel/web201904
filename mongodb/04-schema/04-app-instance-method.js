/*
* @Author: Chen
* @Date:   2019-11-06 09:34:49
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 11:30:43
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

	/*
	UserModel.findOne({name:"Tom"})
	.then(user=>{
		// console.log(user._id)
		//通过id获取文章信息
		BlogModel.find({author:user._id})
		.then(blogs=>{
			console.log(blogs)
		})
		.catch(err=>{
			console.log(err.message)
		})
	})
	.catch(err=>{
		console.log(err)
	})
	*/

	UserModel.findOne({name:"Tom"})
	.then(user=>{
		// console.log(user._id)
		//通过id获取文章信息
		user.getBlogs((err,blogs)=>{
			if(err){
				console.log(err.message)
			}else{
				console.log(blogs)
			}
		})
	})
	.catch(err=>{
		console.log(err)
	})

})