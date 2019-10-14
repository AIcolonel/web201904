
const Router = require('express').Router;

const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');
const ProductModel = require('../models/product.js');
const pagination = require('../util/pagination.js');
const hmac = require('../util/hmac.js')

const router = Router();

//模拟注册信息
/*
router.get('/init',(req,res)=>{
	UserModel
	.insertMany({username:"admin",password:hmac("admin"),isAdmin:true})
	.then(data=>{
		res.json(data)
	})
})
*/
router.get('/init',(req,res)=>{
	const userlist = [];
	for(let i =0;i<500;i++){
		userlist.push({
			username:'test'+i,
			password:hmac('test'+i),
			email:'test'+i+'@kuazhu.com',
			phone:'13546879'+parseInt(Math.random()*10000)
		})
	}
	UserModel
	.insertMany(userlist)
	.then(result=>{
		res.send('insert user ok')
	})
})

//检查用户名是否存在
router.get("/checkUsername",(req,res)=>{
	const username = req.query.username;
	console.log(username);
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
//用户登录
router.post("/login",(req,res)=>{
	const {username,phone,email,password} = req.body
	UserModel
	.findOne({username:username,password:hmac(password)})
	.then((user)=>{
		//有用户信息
		if(user){
			 res.json({
			 	code:0,
			 	message:'',
			 	user:user.username
			 });
		}else{
			//没有用户信息
			res.json({
			 	code:1,
			 	message:'没有该用户信息,请检查用户名和密码是否一致'
			})	
		}
	})
})
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
		sort:{_id:1} //排序
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