/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-14 09:34:23
*/
const express = require('express')
const CategoryModel = require('../models/category.js')
const pagination = require('../util/pagination.js')

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
	/*
	res.render('admin/category_list',{
		userInfo:req.userInfo
	})
	*/

	const options = {
		page:req.query.page / 1,
		model:CategoryModel,
		query:{},
		projection:'-__v',
		sort:{order:1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/category'
		})
	})
	.catch(err=>{
		console.log(err)
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
	let { name,order } = req.body
	if(!order){
		order = 0
	}
	//2.查找数据库是否同名
	CategoryModel.findOne({name:name})
	.then(category=>{
		if(category){//名称重复
			res.render('admin/err',{
				message:"该分类已经存在"
			})
		}else{//没有同名可以插入
			CategoryModel.insertMany({name:name,order:order})
			.then(data=>{
				res.render('admin/ok',{
					message:"新增分类成功",
					url:"/category"
				})
			})
			.catch(err=>{//操作失败
				console.log(err)
				res.render('admin/err',{
					message:"操作数据库失败,请稍后再试"
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			message:"操作数据库失败,请稍后再试"
		})
	})
})

//显示编辑分类页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params
	//数据库查找该分类并将数据返回给模板
	CategoryModel.findById(id)
	.then(category=>{
		if(category){
			res.render('admin/category_edit',{
				userInfo:req.userInfo,
				category:category
			})
		}else{//没有该分类名称
			res.render('admin/err',{
				message:"数据库没有找到该分类名称",
				url:"/category"
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			message:"操作数据库失败,请稍后再试",
			url:"/category"
		})
	})
	
})



module.exports = router