/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-16 16:02:18
*/
const Router = require('express').Router;

const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');
const ProductModel = require('../models/product.js');
const pagination = require('../util/pagination.js');
const hmac = require('../util/hmac.js')

const router = Router();

/*
router.get('/init',(req,res)=>{
	UserModel.insertMany({
		username:'admin',
		password:hmac('admin'),
		isAdmin:true
	})
	.then(result=>{
		res.send('ok')
	})
	.catch(err=>{
		console.log(err)
		res.send('err')
	})
})
*/
/*
router.get('/init',(req,res)=>{
	const users = []
	for(let i = 0;i<500;i++){
		users.push({
			username:'test'+i,
			password:hmac('test'+i),
			email:'test'+i+"@kuazhu.com",
			phone:13212345+i
		})
	}
	UserModel.insertMany(users)
	.then(result=>{
		res.send('ok')
	})
	.catch(err=>{
		console.log(err)
		res.send('err')
	})
})
*/

//检查用户名是否存在
router.get("/checkUsername",(req,res)=>{
	const username = req.query.username;
	UserModel
	.findOne({username:username})
	.then((user)=>{
		if(user){
			res.json({
				code:1,
				message:'用户名已存在'
			})
		}else{
			res.json({
				code:0,
			})
		}
	})
});
//注册用户
router.post("/",(req,res)=>{
	const {username,phone,email,password} = req.body
	UserModel
	.findOne({username:username})
	.then((user)=>{
		//已经有该用户
		if(user){
			 res.json({
			 	code:1,
			 	message:'用户已存在'
			 });
		}else{
			//插入数据到数据库
			new UserModel({
				username:username,
				phone:phone,
				email:email,
				password:hmac(password),
			})
			.save((err,newUser)=>{
				if(!err){//插入成功
					res.json({
						code:0,
						message:'注册成功'
					})
				}else{
					 res.json({
					 	code:1,
					 	message:'注册失败'
					 })					
				}
			})
		}
	})

})
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
router.put("/",(req,res)=>{
	UserModel.update({_id:req.userInfo._id},{password:hmac(req.body.password)})
	.then(raw=>{
		res.json({
			code:0,
			message:'更新成功'
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新失败'
		})
	})
})
//管理员权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.json({
			code:10
		});
	}
})

//获取用户列表
router.get('/list',(req,res)=>{
	let options = {
		page: req.query.page,//需要显示的页码
		model:UserModel, //操作的数据模型
		query:{}, //查询条件
		projection:'-password -__v -updatedAt', //投影
		sort:{_id:-1} //排序
	}
	pagination(options)
	.then((result)=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list
			}
		})
	})
})

module.exports = router;