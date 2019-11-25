/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-13 16:13:15
*/
const express = require('express')
const CategoryModel = require('../models/category.js')

const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登录</h1>')
	}
})

//显示分类列表首页
router.get('/', (req, res) => {
	res.render('admin/category_list',{
		userInfo:req.userInfo
	})
})
//显示新增分类页面
router.get('/add', (req, res) => {
	res.render('admin/category_add',{
		userInfo:req.userInfo
	})
})

//处理新增分类
router.post('/add', (req, res) => {
	//1.获取参数
	const { name,order } = req.body
	//2.查找数据库是否同名
	CategoryModel.findOne({name:name})
	.then(category=>{
		if(category){//名称重复
			res.send('err')
		}else{//没有同名可以插入
			CategoryModel.insertMany({name:name,order:order})
			.then(data=>{
				res.send('ok')
			})
			.catch(err=>{//操作失败
				console.log(err)
				res.send(err)
			})
		}
	})
	.catch(err=>{
		res.send('err')
	})
})



module.exports = router