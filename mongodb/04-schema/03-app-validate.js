/*
* @Author: Chen
* @Date:   2019-11-06 09:34:49
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 11:03:10
*/
const mongoose = require('mongoose')
const UserModel = require('./models/user.js')
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
	//3.1新增
	UserModel.insertMany({
		name:"meko",
		age:50,
		major:"Art",
		phone:13230155689
	})
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log(err)
	})


	/*
	UserModel.findOne({_id:"5dc225ef381ab213bc73d9a5"},(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
			// console.log(docs.createAt.toLocaleString())
			console.log(moment(docs.createAt).format('YYYY-MM-DD HH:mm:ss'))
		}
	})
	*/
})