/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-07-08 17:07:48
*/
const Router = require('express').Router;
const UserModel = require('../models/user.js');

const router = Router();

//普通用户登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})

//添加地址
router.post("/",(req,res)=>{
	let body = req.body;
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		//已有地址
		if(user.shipping){
			user.shipping.push(body)
		}
		//没有地址
		else{
			user.shipping = [body]
		}
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping
			})
		})
	})
});
//获取登录用户的地址列表
router.get("/list",(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			code:0,
			data:user.shipping
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取用户的地址列表失败'
		})
	})	
});
//根据id获取对应的地址
router.get("/detail",(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			code:0,
			data:user.shipping.id(req.query.id)
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取用户地址失败'
		})
	})	
});
//删除地址
router.delete('/',(req,res)=>{
	let body = req.body;
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		user.shipping.id(body.id).remove();
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping
			})
		})
	})
})
//编辑地址
router.put("/",(req,res)=>{
	let body = req.body;
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		let shipping = user.shipping.id(body.id);
		shipping.name = body.name;
		shipping.province = body.province;
		shipping.city = body.city;
		shipping.address = body.address;
		shipping.phone = body.phone;
		shipping.zip = body.zip;
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping
			})
		})
	})
});
module.exports = router;