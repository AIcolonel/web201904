var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js');


//管理员登录验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('<h1>请使用管理员账号登录</h1>')
	}
})

//文章列表首页
router.get('/', (req, res) => {
	
	pagination({
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:"-__v",
		sort:{_id:1}
	})
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/article"
		})
	})
});
//新增文章
router.get('/add', (req, res) => {
	CategoryModel.find({},"name")
	.sort({order:1})
	.then(categories=>{
		res.render('admin/article_add',{
			userInfo:req.userInfo,
			categories
		})
	})
	
});
//提交新增文章
router.post('/add', (req, res) => {
	const { category,title,intro,content } = req.body;
	ArticleModel.insertMany({
		intro,
		title,
		content,
		category,
		author:req.userInfo._id.toString()
	})
	.then(article=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"新增文章成功",
			url:"/article"
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"添加文章失败,操作数据库错误,请稍后再试!!"
		})
	})
	
});

//编辑分类
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category
		})
	})
})
//处理提交编辑分类
router.post('/edit',(req,res)=>{
	const { id,name,order } = req.body;
	console.log(id,name,order);
	CategoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){
			//没有更改数据
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"请更改数据后再次提交"
			})
		}else{
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(newCategory=>{
				if(newCategory){
					//该分类已经存在
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:"该分类已经存在,请重新修改"
					})
				}else{
					CategoryModel.updateOne({_id:id},{name:name,order:order})
					.then(result=>{
						res.render('admin/success',{
							userInfo:req.userInfo,
							message:"修改分类成功",
							url:"/category"
						})
					})
					.catch(err=>{
						throw err;
					})
				}
			})
			.catch(err=>{
				throw err;
			})
		}
	})
	.catch(err=>{
		throw err;
	})
})

//删除分类
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.deleteOne({_id:id})
	.then(category=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"删除分类成功",
			url:"/category"
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"操作数据库错误,请稍后再试!!"
		})
	})
})



module.exports = router;