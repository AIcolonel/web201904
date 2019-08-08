const mongoose = require('mongoose');

//操作数据库(设置文档格式)创建Schema
const CategorySchema = new mongoose.Schema({
	name:{
		type:String
	},
	order:{
		type:Number,
		default:1
	}
});

//创建文档模型
//第一个参数是文档名称,数据库会自动把其变成负数
//第二个参数是Schema
const CategoryModel = mongoose.model('category', CategorySchema);

//导出模型
module.exports = CategoryModel;