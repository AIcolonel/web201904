/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-18 10:59:49
*/
const express = require('express')
const ArticleModel = require('../models/article.js')
const CategoryModel = require('../models/category.js')
const pagination = require('../util/pagination.js')

const multer = require('multer')
//dest参数表示将图片存放的地址
const upload = multer({dest:'public/uploads/'})

const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登录</h1>')
	}
})

//显示文章列表首页
router.get('/', (req, res) => {
	/*
	const options = {
		page:req.query.page / 1,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:-1},
		populates:[{ path: 'user', select: 'username'},{ path: 'category', select: 'name'}]
	}
	pagination(options)
	.then(data=>{
		// console.log(data.docs)
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})
	})
	.catch(err=>{
		console.log(err)
	})
	*/
	ArticleModel.getPaginationData(req)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})
	})
	.catch(err=>{
		console.log(err)
	})
})













//显示新增文章页面
router.get('/add', (req, res) => {
	//前台需要获取所有分类
	CategoryModel.find({})
	.then(categories=>{
		res.render('admin/article_add_edit',{
			userInfo:req.userInfo,
			categories:categories
		})
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库操作错误"
		})
	})
	
})
//处理新增文章
router.post('/add', (req, res) => {
	//1.获取参数
	let { category,title,intro,content } = req.body

	//2.将文章插入到数据库中
	ArticleModel.insertMany({
		category,
		title,
		intro,
		content,
		user:req.userInfo._id
	})
	.then(category=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"新增文章成功",
			url:"/article"
		})
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"操作数据库失败,请稍后再试",
			url:"/article"
		})
	})
})
//处理上传图片
//upload.single('upload')中upload表示的是前台存放二进制图片的字段名称
//,因此必须和前端保持一致
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	// console.log(req.file)
	const filePath = "/uploads/"+req.file.filename
	res.json({
		uploaded:true,
		url:filePath
	})
})












//显示编辑文章页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params
	//数据库查找所有分类并将数据返回给模板
	CategoryModel.find({})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{
			if(article){
				res.render('admin/article_add_edit',{
					userInfo:req.userInfo,
					article:article,
					categories:categories
				})
			}else{//没有该文章
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:"数据库没有找到该文章",
					url:"/article"
				})
			}
		})
		.catch(err=>{
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:"操作数据库失败,请稍后再试",
				url:"/article"
			})
		})
	})
})


//处理编辑文章
router.post('/edit', (req, res) => {
	//1.获取参数
	let { category,title,intro,content,id } = req.body
	//2.更新该文章
	ArticleModel.updateOne({_id:id},{
		category,
		title,
		intro,
		content
	})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"编辑文章成功",
			url:"/article"
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"操作数据库失败,请稍后再试",
			url:"/article"
		})
	})
})

//处理删除文章逻辑
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params
	//数据库查找该分类并将数据返回给模板
	ArticleModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"删除文章成功",
			url:"/article"
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库异常,删除文章失败,请稍后再试",
			url:"/article"
		})
	})
	
})



module.exports = router