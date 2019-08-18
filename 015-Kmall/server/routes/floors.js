/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-07-11 17:13:04
*/
const Router = require('express').Router;
const CategoryModel = require('../models/category.js');
const ProductModel = require('../models/product.js');
const pagination = require('../util/pagination.js');
const {unlimitedForLevel,getChildsId} = require('../util/unlimitedCategory.js');

const router = Router();

async function getFloor(){
	//1.获取显示的一级分类
	const categories = await CategoryModel.find({level:1,isShow:1},"-createdAt -updatedAt -__v -mobileName -pid")
	//2.根据获取的一级分类找到所有的子分类
	const showCategories = await CategoryModel.find({isShow:1},"-createdAt -updatedAt -__v")
	
	/*
		{
			title:'F1 家用电器',
			id:
			products:[

			]
		},

	 */
	const promises = categories.map(category=>{
		const ids = getChildsId(showCategories,category._id)
		ids.push(category._id)
		return ProductModel.find({category:{$in:ids},isShow:1},"-createdAt -updatedAt -__v -images -description -detail -stock")
		.then(products=>{
			return {
				title:category.name,
				id:category._id,
				products:products,
				order:category.order
			}
		})
	})
	const allFloors = await Promise.all(promises)

	const sortFloors = allFloors.sort((f1,f2)=>f2.order-f1.order)

	return sortFloors.map((floor,index)=>{
		floor.num = index + 1
		return floor
	})
}


//获取分类数组数据
router.get("/",(req,res)=>{
	getFloor()
	.then(floors=>{
		res.json({
			code:0,
			data:floors
		})
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});
module.exports = router;