const mongoose = require('mongoose');

//操作数据库(设置文档格式)创建Schema
const BlogSchema = new mongoose.Schema({
	title: {
		type:String,
		required:[true,"必须输入标题信息"],
		maxlength:10
	},
	content:{
		type:String
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'user'
	},
	count:{
		type:Number,
		min:5,
		max:10
	}
});

//创建文档模型
//第一个参数是文档名称,数据库会自动把其变成负数
//第二个参数是Schema
const BlogModel = mongoose.model('blog', BlogSchema);

//导出模型
module.exports = BlogModel;