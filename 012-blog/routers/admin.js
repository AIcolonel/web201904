var express = require('express');
var router = express.Router();
const UserModel = require('../models/user.js');
const pagination = require('../util/pagination.js');


//管理员登录验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('<h1>请使用管理员账号登录</h1>')
	}
})

//后台首页
router.get('/', (req, res) => {
	res.render('admin/index',{
		userInfo:req.userInfo
	})
});
//后台用户列表
router.get('/users', (req, res) => {
	var result = {
		status:0,
		msg:''
	}
	/*
	//分页处理
	let { page } = req.query;
	const limit = 2;

	page = parseInt(page);
	if(isNaN(page)){
		page = 1;
	}

	if(page == 0){
		page = 1;
	}
	// console.log(page)

	//获取数据总条数
	UserModel.countDocuments({})
	.then(count=>{
		//计算总页数
		const pages = Math.ceil(count / limit);
		if(page > pages){
			page = pages;
		}
		//生成页码组
		let list = [];
		for(let i =1;i<=pages;i++){
			list.push(i);
		}
		//每页显示条数
		const skip = (page -1)*limit;


		UserModel.find({},"-password -__v")
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users:users,
				page:page,
				list:list
			})
		})
		.catch(err=>{
			console.log(err);
			//查询数据库失败
			result.status = 10;
			result.msg = "服务器端错误,请稍后再试";
			res.json(result);
		})
	})
	*/

	pagination({
		page:req.query.page,
		model:UserModel,
		query:{},
		projection:"-password -__v",
		sort:{_id:1}
	})
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/admin/users"
		})
	})
});


module.exports = router;