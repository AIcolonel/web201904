/*
* @Author: Chen
* @Date:   2019-11-08 11:05:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 18:09:42
*/
const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const CommentModel = require('../models/comment.js')
const router = express.Router()

async function getCommonData(){
	const getCategoriesPromise = CategoryModel.find({},'name').sort({order:1})
	
	const topArticlesPromise = ArticleModel.find({},'click title').sort({click:-1}).limit(10)
	
	const categories = await getCategoriesPromise
	
	const topArticles = await topArticlesPromise


	return {
		categories,
		topArticles
	}
}




//显示首页
router.get('/', (req, res) => {
	/*
	//获取cookies信息并渲染到模板中
	// let userInfo = req.cookies.get('userInfo') || {}
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'))
	}
	*/

	ArticleModel.getPaginationData(req)
	.then(result=>{
		getCommonData()
		.then(data=>{
			const { categories,topArticles } = data
			res.render('main/index',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//获取分页数据
				articles:result.docs,
				page:result.page,
				list:result.list,
				pages:result.pages,
				url:'/'
			})
		})
	})
	
	
})
//显示列表页
router.get('/list/:id', (req, res) => {
	const id = req.params.id
	ArticleModel.getPaginationData(req,{category:id})
	.then(result=>{
		getCommonData()
		.then(data=>{
			const { categories,topArticles } = data
			res.render('main/list',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//获取分页数据
				articles:result.docs,
				page:result.page,
				list:result.list,
				pages:result.pages,
				//回传分类id
				currentCategoryId:id
			})
		})
	})
})
//显示详情页
async function getDetailData(req){
	const id = req.params.id
	//为了保证排行榜点击量和详情内容中点击量保持一致,必须先获取并更新文章点击量
	const getArticlePromise = ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
							  .populate({ path: 'user', select: 'username'})
							  .populate({ path: 'category', select: 'name'})
	const getCommonDataPromise = getCommonData()
	//获取评论信息(并且只需要找到对应某一篇文章下面的所有评论)
	const getCommentDataPromise = CommentModel.getPaginationData(req,{article:id})
	
	const articleData = await getArticlePromise
	const commonData = await getCommonDataPromise
	const commentsData = await getCommentDataPromise

	const { categories,topArticles } = commonData
	return {
		categories,
		topArticles,
		articleData,
		commentsData
	}
}



router.get('/detail/:id', (req, res) => {
	//获取详情页数据
	getDetailData(req)
	.then(data=>{
		const { categories,topArticles,articleData,commentsData } = data
		res.render('main/detail',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			articleData,
			currentCategoryId:articleData.category._id.toString(),
			//返回评论分页数据
			comments:commentsData.docs,
			page:commentsData.page,
			list:commentsData.list,
			pages:commentsData.pages
		})
	})
	
})



//处理首页文章分页数据
router.get('/articles',(req,res)=>{
	const id = req.query.id
	let query = {}
	if(id){
		query.category = id
	}
	ArticleModel.getPaginationData(req,query)
	.then(result=>{
		res.json({
			code:0,
			message:'获取数据成功',
			data:result
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({
			code:10,
			message:'获取数据失败'
		})
	})
})


module.exports = router