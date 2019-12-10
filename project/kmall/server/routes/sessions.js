/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 20:34:10
*/
const Router = require('express').Router

const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')

const router = Router();

/*
//用户退出
router.get('/user',(req,res)=>{
	req.session.destroy();
	res.json({
		code:0,
	})
})
*/

//用户登录
router.post("/users",(req,res)=>{
	const { username,password,role} = req.body
	
	let isAdmin = false
	if(role == 'admin'){
		isAdmin = true
	}

	UserModel
	.findOne({username:username,password:hmac(password),isAdmin:isAdmin})
	.then((user)=>{
		if(user){
			 req.session.userInfo = {
			 	_id:user._id,
			 	username:username,
			 	isAdmin:isAdmin
			 }
			 res.json({
			 	code:0,
			 	data:{
			 		username:username
			 	}
			 });
		}else{
			res.json({
			 	code:1,
			 	message:"用户名和密码错误",
			 	data:{
			 		username:username
			 	}
			 })
		}
	})
})

//用户退出
router.delete('/users',(req,res)=>{
	req.session.destroy();
	res.json({
		code:0,
	})
})
//获取登录用户的用户名
router.get("/username",(req,res)=>{
	if(req.userInfo._id){
		res.json({
			code:0,
			data:{
				username:req.userInfo.username
			}
		})
	}else{
		res.json({
			code:1
		});
	}
});

//登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})

//获取登录用户的信息
router.get("/users",(req,res)=>{
	UserModel.findById(req.userInfo._id,"username phone email")
	.then(user=>{
		res.json({
			code:0,
			data:user
		})
	})
	.catch(e=>{
		res.json({
			code:1
		});			
	})
})

module.exports = router;