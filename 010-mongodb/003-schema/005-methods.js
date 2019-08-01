//链接数据库
const mongoose = require('mongoose');

const BlogModel = require('./models/blog.js');
const UserModel = require('./models/user.js');

mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{
	console.log(err)
});
db.once('open', ()=> {
  	// we're connected!
  	console.log("we're connected!");
	//插入数据
	/*
	BlogModel.insertMany(
		{
			title:"title1",
			content:"content1",
			author:"5d41567897ee515aa0efb1d0",
			count:10
		},
		(err,docs)=>{
		if(err){
			console.log("insertMany data err::",err);
		}else{
			console.log(docs);
		}
	})
	*/

	//获取数据
	/*
	UserModel.findOne({name:"Tom"},(err,user)=>{
		if(err){
			console.log("findOne data err::",err);
		}else{
			// console.log(user);
			BlogModel.find({author:user._id},(err,blogs)=>{
				if(err){
					console.log("findblogs data err::",err);
				}else{
					console.log(blogs);
				}
			})
		}
	})
	*/
	UserModel.findOne({name:"Tom"},(err,user)=>{
		if(err){
			console.log("findOne data err::",err);
		}else{
			// console.log(user);
			user.findBlogs((err,blogs)=>{
				if(err){
					console.log("findblogs data err::",err);
				}else{
					console.log(blogs);
				}
			})
		}
	})
});


