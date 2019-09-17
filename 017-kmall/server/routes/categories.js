/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-25 10:09:18
*/
const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js');
const {unlimitedForLevel} = require('../util/unlimitedCategory.js');

const router = Router();

//获取分类数组数据
router.get("/homeCategories",(req,res)=>{
	CategoryModel.find({level:1,isShow:1},"-createdAt -updatedAt -__v -mobileName -pid")
	.sort({order:-1,_id:-1})
	.then((categories)=>{
		res.json({
			code:0,
			data:categories
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});


//权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})
/**
 * [getLevel 根据父类id计算等级]
 * @param  {[type]} pid [description]
 * @return {[type]}     [description]
 */
async function getLevel(pid){
	let level = 1;
	if(pid != 0){
		level = await CategoryModel.findById(pid)
			.then(cate3=>{
				//最多支持3级分类
				if(cate3.level < 3){
					return cate3.level + 1;
				}else{
					throw new Error("最多支持三级分类")
				}
			})
	}
	return level;	
}

//获取分类分页数据
router.get("/list",(req,res)=>{
	let page = req.query.page || 1;
	CategoryModel
	.getPaginationCategories(page)
	.then((result)=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list
			}
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})		
});

//添加分类
router.post("/",(req,res)=>{
	
	const {mobileName,name,pid} = req.body
	
	CategoryModel
	.findOne({name:name,pid:pid})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"添加分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.findOne({mobileName:mobileName,pid:pid})
			.then(cate2=>{
				if(cate2){
			 		res.json({
			 			code:1,
			 			message:"添加分类失败,手机分类已存在"
			 		})
			 	}else{
			 		getLevel(pid)
			 		.then(level=>{
						new CategoryModel({
							level:level,
							name:name,
							mobileName:mobileName,
							pid:pid
						})
						.save()
						.then((newCate)=>{
							//添加成功后返回新的分类
							if(newCate){
								CategoryModel.find({},"-createdAt -updatedAt -__v")
								.then((categories)=>{
									res.json({
										code:0,
										data:unlimitedForLevel(categories,'|--')
									})	
								})	
							}
						})
						.catch((e)=>{
					 		res.json({
					 			code:1,
					 			message:"添加分类失败,服务器端错误"
					 		})
						})
			 		})
			 		.catch(e=>{
				 		res.json({
				 			code:1,
				 			message:"添加分类失败,"+e.message
				 		})			 			
			 		})
			 	}				
			})
		}
	})
})


//获取分类数组数据
router.get("/levelCategories",(req,res)=>{
	const level = req.query.level || 2
	CategoryModel.find({},"-createdAt -updatedAt -__v")
	.then((categories)=>{
		res.json({
			code:0,
			data:unlimitedForLevel(categories,'|--',0,level)
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});

//更新名称
router.put("/name",(req,res)=>{
	const {name,id,page} = req.body
	CategoryModel
	.findOne({name:name})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"更新分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.update({_id:id},{name:name})
			.then((cate)=>{
				if(cate){
					CategoryModel
					.getPaginationCategories(page)
					.then((result)=>{
						res.json({
							code:0,
							data:{
								current:result.current,
								total:result.total,
								pageSize:result.pageSize,
								list:result.list					
							}
						})	
					})					
				}else{
			 		res.json({
			 			code:1,
			 			message:"更新分类失败,数据操作失败"
			 		})					
				}
			})
			.catch((e)=>{
		 		res.json({
		 			code:1,
		 			message:"添加分类失败,服务器端错误"
		 		})
			})
		}
	})
})
//更新手机名称
router.put("/mobileName",(req,res)=>{
	const {mobileName,id,page} = req.body
	CategoryModel
	.findOne({mobileName:mobileName})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"更新分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.update({_id:id},{mobileName:mobileName})
			.then((cate)=>{
				if(cate){
					CategoryModel
					.getPaginationCategories(page)
					.then((result)=>{
						res.json({
							code:0,
							data:{
								current:result.current,
								total:result.total,
								pageSize:result.pageSize,
								list:result.list					
							}
						})	
					})					
				}else{
			 		res.json({
			 			code:1,
			 			message:"更新分类失败,数据操作失败"
			 		})					
				}
			})
			.catch((e)=>{
		 		res.json({
		 			code:1,
		 			message:"添加分类失败,服务器端错误"
		 		})
			})
		}
	})
})
//更新排序
router.put("/order",(req,res)=>{
	const {order,id,page} = req.body
	CategoryModel
	.update({_id:id},{order:order})
	.then((cate)=>{
		if(cate){
			CategoryModel
			.getPaginationCategories(page)
			.then((result)=>{
				res.json({
					code:0,
					data:{
						current:result.current,
						total:result.total,
						pageSize:result.pageSize,
						list:result.list					
					}
				})	
			})					
		}else{
	 		res.json({
	 			code:1,
	 			message:"更新排序失败,数据操作失败"
	 		})					
		}
	})
})
//更新显示
router.put("/isShow",(req,res)=>{
	const {isShow,id,page} = req.body
	CategoryModel
	.update({_id:id},{isShow:isShow})
	.then((cate)=>{
		if(cate){
			CategoryModel
			.getPaginationCategories(page)
			.then((result)=>{
				res.json({
					code:0,
					data:{
						current:result.current,
						total:result.total,
						pageSize:result.pageSize,
						list:result.list					
					}
				})	
			})					
		}else{
	 		res.json({
	 			code:1,
	 			message:"更新排序失败,数据操作失败"
	 		})					
		}
	})
})
module.exports = router;