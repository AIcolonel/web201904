/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-07-08 17:02:08
*/
const Router = require('express').Router;
const OrderModel = require('../models/order.js');

const router = Router();

router.get('/',(req,res)=>{
	//todo.... 更具订单号获取订单信息,然后调用支付宝接口获取支付二维码
	res.json({
		code:0,
		data:{
			orderNo:req.query.orderNo,
			//该地址应该从支付宝接口获取
			qrUrl:"http://127.0.0.1:3000/alipay-qr/pay.jpg"
		}
	})

})

router.get('/status',(req,res)=>{
	let orderNo =  req.query.orderNo;
	OrderModel.findOne({orderNo:orderNo},'status')
	.then(order=>{
		res.json({
			code:0,
			data:order.status == 30
		})
	})
})
module.exports = router;