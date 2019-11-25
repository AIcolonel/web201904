/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-12 15:17:18
*/
const express = require('express')
const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')

const router = express.Router()

//处理注册
router.post('/register', (req, res) => {
	//1.获取参数
	// console.log(req.body)
	const { username,password } = req.body
	//2.查找数据库同名验证
	UserModel.findOne({username:username})
	.then(user=>{
		if(user){//数据库有同名数据
			res.json({
				code:10,
				message:'用户名重复,请修改用户名'
			})
		}else{//用户名可以注册
			//3.插入数据
			UserModel.insertMany({
				username:username,
				password:hmac(password),
				// isAdmin:true
			})
			.then(data=>{
				res.json({
					code:0,
					message:'注册成功',
					user:data
				})
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({
			code:10,
			message:'服务器端错误,请稍后再试'
		})
	})
	
})


//处理登录
router.post('/login', (req, res) => {
	//1.获取参数
	const { username,password } = req.body
	//2.查找数据库同名验证
	UserModel.findOne({username:username,password:hmac(password)},'-password')
	.then(user=>{
		if(user){//数据库有该数据
			//登录成功设置cookie信息(同时可以设置过期时间)
			// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24})
			req.session.userInfo = user
			res.json({
				code:0,
				message:'登录成功',
				user:user
			})
		}else{//数据库没有该数据
			res.json({
				code:10,
				message:'用户名密码输入不正确'
			})
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({
			code:10,
			message:'服务器端错误,请稍后再试'
		})
	})
})

//处理退出
router.get('/logout',(req,res)=>{
	//清除cookies
	// req.cookies.set('userInfo',null)
	//销毁session
	req.session.destroy()
	res.json({
		code:0,
		message:'退出登录成功'
	})
})



module.exports = router