/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-07-08 17:42:42
*/
const Router = require('express').Router;
const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');

const router = Router();
//用户登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})
//获取订单列表
router.get('/list',(req,res)=>{
	const { page,keyword }  = req.query;
	const query = {}
	//普通用户只能查看自己的订单
	if(!req.userInfo.isAdmin){
		query.user = req.userInfo._id
	}
	//搜索处理
	if(keyword){
		query.orderNo = {$regex:new RegExp(keyword,'i')}
	}

	OrderModel.getPaginationOrders(page,query)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list,
				keyword:keyword					
			}
		})		
	})
	.catch(e=>{
		console.log(e)
		res.json({
			code:1,
			message:'获取订单列表失败'
		})
	})	
})
//获取订单详情
router.get('/detail',(req,res)=>{
	const {orderNo} = req.query;
	const query = {}
	//普通用户只能查看自己的订单
	if(!req.userInfo.isAdmin){
		query.user = req.userInfo._id
	}
	query.orderNo = orderNo	
	OrderModel.findOne(query)
	.then(order=>{
		res.json({
			code:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单失败'
		})
	})	
})

//获取生成订单的商品列表
router.get('/products',(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderProductList()
		.then(cart=>{
			res.json({
				code:0,
				data:cart
			})			
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单商品失败'
		})
	})	
})

//创建订单
router.post('/',(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		let order = {};
		user.getOrderProductList()
		.then(result=>{
			order.payment = result.totalCartPrice;
			//构建订单的商品
			let productList = [];
			result.cartList.forEach(item=>{
				productList.push({
					productId:item.product._id,
					count:item.count,
					totalPrice:item.totalPrice,
					price:item.product.price,
					mainImage:item.product.mainImage,
					name:item.product.name
				})
			})
			order.productList = productList;

			//构建订单的地址信息
			let shipping = user.shipping.id(req.body.shippingId);
			order.shipping = {
				shippingId:shipping._id,
				    name:shipping.name,
				    province:shipping.province,
				    city:shipping.city,
				    address:shipping.address,
				    phone:shipping.phone,
				    zip:shipping.zip
			}

			//构建订单号
			order.orderNo = Date.now().toString() + parseInt(Math.random()*10000);

			//赋值用户ID
			order.user = user._id;

			new OrderModel(order)
			.save()
			.then(newOder=>{
				//删除购物车中选中的商品
				UserModel.findById(req.userInfo._id)
				.then(userUser=>{
					let newCartList = userUser.cart.cartList.filter(item=>{
						return item.checked == false;
					})
					userUser.cart.cartList = newCartList;
					userUser.save()
					.then(newUser2=>{
						//返回订单到前台
						res.json({
							code:0,
							data:newOder
						})					
					})
				})
			})	
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单商品失败'
		})
	})
})

//更新订单状态
router.put('/status',(req,res)=>{
	const {orderNo,status} = req.body
	const query = {orderNo:orderNo}
	//普通用户只能修改自己的订单
	if(!req.userInfo.isAdmin){
		query.user = req.userInfo._id
	}
	const update = {}

	//权限检查
	if(!req.userInfo.isAdmin && status == '20'){
		update.status = status
		update.statusDesc = "取消"
	}
	else if(req.userInfo.isAdmin && status == '40'){
		update.status = status
		update.statusDesc = "已发货"
	}
	//没有权限
	else{
		return res.json({
			code:10
		})		
	}
	//更新
	OrderModel.findOneAndUpdate(
		query,
		update,
		{new:true}
	)
	.then(order=>{
		res.json({
			code:0,
			data:order
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新订单失败'
		})
	})	
})

module.exports = router;