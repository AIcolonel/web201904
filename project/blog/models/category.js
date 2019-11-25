/*
* @Author: Chen
* @Date:   2019-11-10 11:24:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-13 17:50:50
*/
const mongoose = require('mongoose')


//1.定义文档模型
	const CategorySchema = new mongoose.Schema({
	  	name:{
	  		type:String,
	  		required:[true,"必须输入分类名称"]
	  	},
	  	order:{
	  		type:Number,
	  		default:0
	  	}
	})

//2.根据文档模型生成对应模型(集合)
//2.1第一个参数就是需要生成的集合名称,mongoose子自动将集合名称转化为复数
//2.2第二个参数就是前面定义的文档模型
const CategoryModel = mongoose.model('category', CategorySchema)


module.exports = CategoryModel