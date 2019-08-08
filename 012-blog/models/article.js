const mongoose = require('mongoose');

//操作数据库(设置文档格式)创建Schema
const ArticleSchema = new mongoose.Schema({
	title:{
		type:String
	},
	intro:{
		type:String
	},
	content:{
		type:String
	},
	author:{
		type:mongoose.Schema.Types.ObjectId
	},
	category:{
		type:mongoose.Schema.Types.ObjectId
	},
	click:{
		type:Number,
		default:0
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

//创建文档模型
//第一个参数是文档名称,数据库会自动把其变成负数
//第二个参数是Schema
const ArticleModel = mongoose.model('article', ArticleSchema);

//导出模型
module.exports = ArticleModel;