/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-22 22:19:25
*/
const Router = require('express').Router;
const AdModel = require('../models/ad.js');

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/ad-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const router = Router();


//获取位置的广告
router.get("/positionAds",(req,res)=>{
	const position = req.query.position || 1
	AdModel.find({position:position,isShow:1},"-createdAt -updatedAt -__v")
	.sort({order:-1})
	.then((ads)=>{
		res.json({
			code:0,
			data:ads
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取广告失败,服务器端错误"
 		})		
	})	
});


//获取广告列表
router.get('/list',(req,res)=>{
	const {page,position} = req.query
	
	let query = {};
	
	if(position){
		query.position = position
	}

	//如果是普通用户,只能获取显示的广告
	if(!req.userInfo.isAdmin){
		query.isShow = 1
	}	

	let projection = '-__v -createdAt -updatedAt';

	let sort={order:-1,_id:-1};


	AdModel.getPaginationAds(page,query,projection,sort)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list,
			}
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取广告列表失败'
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
//获取广告详细信息
router.get('/detail',(req,res)=>{
	let query = {
		_id:req.query.id
	}
	AdModel
	.findOne(query,"-__v -createdAt -updatedAt")
	.then(ad=>{
		res.json({
			code:0,
			data:ad
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取广告详情失败'
		})
	})
})
//处理图片
router.post("/image",upload.single('file'),(req,res)=>{
	const filePath = 'http://127.0.0.1:3000/ad-images/'+req.file.filename;
	res.send({
    	"name": req.file.originalname,
    	"status": "done",
    	"url": filePath,
    	"thumbUrl": filePath
	});
	
})

//添加广告
router.post("/",(req,res)=>{
	const {name,link,image,position}  = req.body;
	new AdModel({
		name:name,
		image:image,
		link:link,
		position:position,
	})
	.save()
	.then((ad)=>{
		if(ad){
			res.json({
				code:0,
				message:'新增广告成功'
			})
		}
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"新增广告失败,服务器端错误"
 		})
	})
})

//编辑广告
router.put("/",(req,res)=>{
	const {id,name,link,image,position}  = req.body;
	const update = {
		name:name,
		image:image,
		link:link,
		position:position,
	}
	AdModel
	.update({_id:id},update)
	.then((raw)=>{
		res.json({
			code:0,
			message:'更新广告成功'
		})
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"更新广告失败,服务器端错误"
 		})
	})
})

//更新排序
router.put("/order",(req,res)=>{
	const {order,id,page}  = req.body
	AdModel
	.update({_id:id},{order:order})
	.then((ad)=>{
		if(ad){
			AdModel
			.getPaginationAds(page,{})
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

router.put("/isShow",(req,res)=>{
	const {id,isShow,page}  = req.body;
	AdModel
	.update({_id:id},{isShow:isShow})
	.then((ad)=>{
		if(ad){
			AdModel
			.getPaginationAds(page,{})
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