/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 18:00:31
*/
const express = require('express')
const UserModel = require('../models/user.js')
const CommentModel = require('../models/comment.js')
const pagination = require('../util/pagination.js')
const hmac = require('../util/hmac.js')

const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.send('<h1>请登录账号</h1>')
	}
})

//显示首页
router.get('/', (req, res) => {
	res.render('home/index',{
		userInfo:req.userInfo
	})
})


//显示评论列表首页
router.get('/comment', (req, res) => {
	//用户只能显示自己评论的内容
	CommentModel.getPaginationData(req,{user:req.userInfo._id})
	.then(data=>{
		res.render('home/comment_list',{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/home/comment'
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
	CommentModel.deleteOne({_id:id,user:req.userInfo._id})
	.then(result=>{
		res.render('home/ok',{
			userInfo:req.userInfo,
			message:"删除评论成功",
			url:"/home/comment"
		})
	})
	.catch(err=>{
		res.render('home/err',{
			userInfo:req.userInfo,
			message:"数据库异常,删除评论失败,请稍后再试",
			url:"/home/comment"
		})
	})
	
})

//显示修改密码页面
router.get('/password', (req, res) => {
	res.render('home/password',{
		userInfo:req.userInfo
	})
})
//处理修改密码
router.post('/password',(req,res)=>{
	const { password } = req.body
	UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
	.then(data=>{
		req.session.destroy()
		res.render('home/ok',{
			userInfo:req.userInfo,
			message:"修改密码成功",
			url:"/"
		})
	})
	.catch(err=>{
		res.render('home/err',{
			userInfo:req.userInfo,
			message:"修改密码失败",
			url:"/home/password"
		})
	})
})


module.exports = router