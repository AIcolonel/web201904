/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 15:40:47
*/
const express = require('express')
const CommentModel = require('../models/comment.js')



const router = express.Router()

//权限验证
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.send('<h1>请登录后再提交评论</h1>')
	}
})

//处理添加评论逻辑
router.post('/add',(req,res)=>{
	const { content,article } = req.body
	CommentModel.insertMany({
		content,
		article,
		user:req.userInfo._id
	})
	.then(comment=>{
		//返回分页数据,并且只需要返回对应文章下的所有评论即可
		CommentModel.getPaginationData(req,{article:article})
		.then(data=>{
			res.json({
				code:0,
				message:'评论成功',
				data:data
			})
		})
		.catch(err=>{
			res.json({
				code:10,
				message:'评论失败'
			})
		})
	})
	.catch(err=>{
		res.json({
			code:10,
			message:'评论失败'
		})
	})
})

//处理评论ajax
router.get('/list',(req,res)=>{
	const id = req.query.id
	let query = {}
	if(id){
		query.article = id
	}
	CommentModel.getPaginationData(req,query)
	.then(result=>{
		console.log(result)
		res.json({
			code:0,
			message:'获取评论成功',
			data:result
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({
			code:10,
			message:'获取评论失败'
		})
	})
})


module.exports = router