var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js');


//管理员登录验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('<h1>请使用管理员账号登录</h1>')
	}
})

//分类列表首页
router.get('/', (req, res) => {
	
	pagination({
		page:req.query.page,
		model:CategoryModel,
		query:{},
		projection:"-password -__v",
		sort:{order:1}
	})
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/category"
		})
	})
});
//新增分类
router.get('/add', (req, res) => {
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
});
//提交新增分类
router.post('/add', (req, res) => {
	const { name,order } = req.body;
	CategoryModel.findOne({name})
	.then(category=>{
		if(category){//分类已经存在
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"添加分类失败,该分类已经存在"
			})
		}else{//分类可以添加
			CategoryModel.insertMany({name,order})
			.then(result=>{
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:"添加分类成功",
					url:"/category"
				})
			})
			.catch(err=>{
				console.log(err);
				res.render('/admin/error',{
					userInfo:req.userInfo,
					message:"操作数据库错误,请稍后再试!!"
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"操作数据库错误,请稍后再试!!"
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