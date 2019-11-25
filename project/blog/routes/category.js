/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-14 11:12:34
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
	res.render('admin/category_add_edit',{
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
				userInfo:req.userInfo,
				message:"该分类已经存在"
			})
		}else{//没有同名可以插入
			CategoryModel.insertMany({name:name,order:order})
			.then(data=>{
				res.render('admin/ok',{
					userInfo:req.userInfo,
					message:"新增分类成功",
					url:"/category"
				})
			})
			.catch(err=>{//操作失败
				console.log(err)
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:"操作数据库失败,请稍后再试"
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
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
			res.render('admin/category_add_edit',{
				userInfo:req.userInfo,
				category:category
			})
		}else{//没有该分类名称
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:"数据库没有找到该分类名称",
				url:"/category"
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"操作数据库失败,请稍后再试",
			url:"/category"
		})
	})
	
})


//处理编辑分类
router.post('/edit', (req, res) => {
	//1.获取参数
	let { name,order,id } = req.body
	if(!order){
		order = 0
	}
	//2.根据ID找到该条数据
	CategoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){
			//没有改变数据则不操作数据库
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:"请修改分类再提交",
				url:"/category"
			})
		}else{
			//查找数据库是否已经有该名称的分类
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(category=>{
				if(category){//说明数据库中已经存在该分类名称
					res.render('admin/err',{
						userInfo:req.userInfo,
						message:"该分类名称已经存在",
						url:"/category"
					})
				}else{//可以修改该分类名称
					CategoryModel.updateOne({_id:id},{name:name,order:order})
					.then(result=>{
						res.render('admin/ok',{
							userInfo:req.userInfo,
							message:"编辑分类成功",
							url:"/category"
						})
					})
					.catch(err=>{
						res.render('admin/err',{
							userInfo:req.userInfo,
							message:"操作数据库失败,请稍后再试",
							url:"/category"
						})
					})
				}
			})
			.catch(err=>{
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:"操作数据库失败,请稍后再试",
					url:"/category"
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"操作数据库失败,请稍后再试",
			url:"/category"
		})
	})
})

//处理删除分类逻辑
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params
	//数据库查找该分类并将数据返回给模板
	CategoryModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"删除分类成功",
			url:"/category"
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库异常,删除分类失败,请稍后再试",
			url:"/category"
		})
	})
	
})



module.exports = router