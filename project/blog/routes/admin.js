/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 17:42:44
*/
const express = require('express')
const UserModel = require('../models/user.js')
const CommentModel = require('../models/comment.js')
const pagination = require('../util/pagination.js')
const hmac = require('../util/hmac.js')

const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登录</h1>')
	}
})

//显示首页
router.get('/', (req, res) => {
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})
//显示用户列表
router.get('/users', (req, res) => {
	/*
	分页分析:前提条件:得知道要显示第几页的数据,由前端传递参数page
	约定:每一页显示几条数据limit = 2
	规律:
		第1页 显示 1-2 	skip=(1-1)*2 limit = 2
		第2页 显示 2-4	skip=(2-1)*2 limit = 2
		第3页 显示 5-6	skip=(3-1)*2 limit = 2
		......
		第page页 显示   	skip=(page-1)*2 limit = 2
	

	*/
	/*
	//获取用户信息渲染到模板
	const limit = 2
	let page = req.query.page / 1
	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}
	UserModel.countDocuments((err,count)=>{
		// console.log(count)
		const pages = Math.ceil(count/limit)
		// console.log(pages)
		//下一页边界控制
		if(page > pages){
			page = pages
		}
		//由于在swig中不能直接进行数字循环因此需要生成页码数组并传递给前台
		let list = []
		for(let i = 1;i<=pages;i++){
			list.push(i)
		}

		const skip = (page - 1)*limit
		UserModel.find({},'-password -__v')
		.sort({_id:-1})
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users:users,
				page:page,
				list:list,
				pages:pages
			})
		})
		.catch(err=>{
			console.log(err)
		})
	})
	*/
	const options = {
		page:req.query.page / 1,
		model:UserModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:-1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})
	})
	.catch(err=>{
		console.log(err)
	})
})



//显示评论列表首页
router.get('/comment', (req, res) => {
	CommentModel.getPaginationData(req)
	.then(data=>{
		res.render('admin/comment_list',{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/admin/comment'
		})
	})
	.catch(err=>{
		console.log(err)
	})
	
})
//处理删除评论
router.get('/comment/delete/:id',(req,res)=>{
	const { id } = req.params
	//数据库查找该分类并将数据返回给模板
	CommentModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"删除评论成功",
			url:"/admin/comment"
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"数据库异常,删除评论失败,请稍后再试",
			url:"/admin/comment"
		})
	})
	
})

//显示修改密码页面
router.get('/password', (req, res) => {
	res.render('admin/password',{
		userInfo:req.userInfo
	})
})
//处理修改密码
router.post('/password',(req,res)=>{
	const { password } = req.body
	UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
	.then(data=>{
		req.session.destroy()
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"修改密码成功",
			url:"/"
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"修改密码失败",
			url:"/admin/password"
		})
	})
})


module.exports = router