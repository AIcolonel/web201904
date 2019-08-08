const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js');

//用户注册登录
router.post('/register', (req, res) => {
	//利用结构解析
	const {username,password} = req.body;
	//1.查询数据库是否已经存在该用户
	var result = {
		status:0,
		msg:''
	}
	UserModel.findOne({username},(err,user)=>{
		if(!err){
			//用户已经存在
			if(user){
				result.status = 10;
				result.msg = "用户已经存在";
				res.json(result);
			}else{
				//用户名可以注册
				UserModel.insertMany({
					username,
					password:hmac(password),
					// isAdmin:true
				})
				.then(user=>{
					// result.data = user;
					res.json(result);
				})
				.catch(err=>{
					throw err;
				})
			}
		}else{
			console.log(err);
			//查询数据库失败
			result.status = 10;
			result.msg = "服务器端错误,请稍后再试";
			res.json(result);
		}
	})
});
//用户登录
router.post('/login', (req, res) => {
	//利用结构解析
	const {username,password} = req.body;
	//1.查询数据库是否已经存在该用户
	var result = {
		status:0,
		msg:''
	}
	UserModel.findOne({username,password:hmac(password)},"-password -__v",(err,user)=>{
		if(!err){
			//登录成功
			if(user){
				//设置cookies
				// req.cookies.set("userInfo",JSON.stringify(user));
				req.session.userInfo = user;
				result.user = user;
				res.json(result);
			}else{
				//登录失败
				result.status = 10;
				result.msg = "用户名和密码不正确!!!";
				res.json(result);
			}
		}else{
			console.log(err);
			//查询数据库失败
			result.status = 10;
			result.msg = "服务器端错误,请稍后再试";
			res.json(result);
		}
	})
});
//用户退出
router.get('/logout',(req,res)=>{
	var result = {
		status:0,
		msg:''
	};
	//清除cookies
	// req.cookies.set("userInfo",null);
	req.session.destroy();
	res.json(result);
})

module.exports = router;