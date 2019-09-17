/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-25 15:27:54
*/
const Router = require('express').Router;
const ProductModel = require('../models/product.js');
const CategoryModel = require('../models/category.js');
const {unlimitedForLevel,getChildsId} = require('../util/unlimitedCategory.js');

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const router = Router();

async function getPaginationProducts(req){
	const {page,status,category,keyword,orderBy} = req.query
	let query = {};
	
	//如果是普通用户,只能获取上架的商品
	if(!req.userInfo.isAdmin){
		query.status = 1
	}	
	if(category){
		//获取所有显示的子分类id
		const showCategories = await CategoryModel.find({isShow:1},"-createdAt -updatedAt -__v")
		const ids = getChildsId(showCategories,category)
		ids.push(category)
		query.category = {$in:ids};
	}
	else if(keyword){
		query.name = {$regex:new RegExp(keyword,'i')}
	}

	let projection = 'name _id price status order isShow isHot mainImage';

	let sort={order:-1,_id:-1};

	if(orderBy == 'price_asc'){
		sort = {price:1}
	}else if(orderBy == 'price_desc'){
		sort = {price:-1}
	}
	const result = await ProductModel.getPaginationProducts(page,query,projection,sort)
	result.keyword = keyword
	return result
}

//获取商品列表
router.get('/list',(req,res)=>{
	/*
	const {page,status,category,keyword,orderBy} = req.query
	
	let query = {};
	
	//如果是普通用户,只能获取上架的商品
	if(!req.userInfo.isAdmin){
		query.status = 1
	}	
	if(category){
		query.category = category;
	}
	else if(keyword){
		query.name = {$regex:new RegExp(keyword,'i')}
	}

	let projection = 'name _id price status order isShow isHot mainImage';

	let sort={order:-1,_id:-1};

	if(orderBy == 'price_asc'){
		sort = {price:1}
	}else if(orderBy == 'price_desc'){
		sort = {price:-1}
	}

	ProductModel.getPaginationProducts(page,query,projection,sort)
	*/
	getPaginationProducts(req)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list,
				keyword:result.keyword					
			}
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品列表失败'
		})
	})
})

//获取商品详细信息
router.get('/detail',(req,res)=>{
	let query = {
		_id:req.query.id
	}
	//如果是普通用户,只能获取上架的商品
	if(!req.userInfo.isAdmin){
		query.status = 1
	}
	ProductModel
	.findOne(query,"-__v -createdAt -updatedAt")
	.populate({path:'category',select:'_id name'})
	.then(product=>{
		res.json({
			code:0,
			data:product
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品详情失败'
		})
	})
})

//管理员权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})

//处理商品图片
router.post("/images",upload.single('file'),(req,res)=>{
	const filePath = 'http://127.0.0.1:3000/product-images/'+req.file.filename;
	res.send({
    	"name": req.file.originalname,
    	"status": "done",
    	"url": filePath,
    	"thumbUrl": filePath
	});
	
})
//处理商品详情图片
router.post("/detailImages",upload.single('upload'),(req,res)=>{
	const filePath = 'http://127.0.0.1:3000/product-images/'+req.file.filename;
	res.json({
		  "success": true,
		  "msg": "上传成功",
		  "file_path": filePath
	});
})

//添加商品
router.post("/",(req,res)=>{
	let body = req.body;
	new ProductModel({
		name:body.name,
		category:body.category,
		detail:body.detail,
		description:body.description,
		mainImage:body.mainImage,
		images:body.images,
		price:body.price,
		stock:body.stock
	})
	.save()
	.then((product)=>{
		if(product){
			res.json({
				code:0,
				message:'新增商品成功'
			})
		}
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"新增商品失败,服务器端错误"
 		})
	})
})

//编辑商品
router.put("/",(req,res)=>{
	let body = req.body;
	let update = {
		name:body.name,
		category:body.category,
		detail:body.detail,
		description:body.description,
		mainImage:body.mainImage,
		images:body.images,
		price:body.price,
		stock:body.stock
	}
	ProductModel
	.update({_id:body.id},update)
	.then((raw)=>{
		res.json({
			code:0,
			message:'更新商品成功'
		})
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"更新分类失败,服务器端错误"
 		})
	})
})

//更新排序
router.put("/order",(req,res)=>{
	const {order,id,page}  = req.body
	ProductModel
	.update({_id:id},{order:order})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
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

//更新排序
router.put("/status",(req,res)=>{
	const {page,id,status}  = req.body;
	ProductModel
	.update({_id:id},{status:status})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
			.then((result)=>{
				res.json({
					code:0,
					message:'更新状态成功',
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
				message:'更新状态失败'
			})							
		}
	})
})
router.put("/isShow",(req,res)=>{
	const {id,isShow,page}  = req.body;
	ProductModel
	.update({_id:id},{isShow:isShow})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
			.then((result)=>{
				res.json({
					code:0,
					message:'更新成功',
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
				message:'更新失败'
			})							
		}
	})
})
router.put("/isHot",(req,res)=>{
	const{id,isHot,page}  = req.body;
	ProductModel
	.update({_id:id},{isHot:isHot})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
			.then((result)=>{
				res.json({
					code:0,
					message:'更新成功',
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
				message:'更新失败'
			})							
		}
	})
})

module.exports = router;