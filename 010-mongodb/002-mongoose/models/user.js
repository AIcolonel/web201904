const mongoose = require('mongoose');

//操作数据库(设置文档格式)创建Schema
const userSchema = new mongoose.Schema({
	name: String,
	age:Number,
	major:String
});

//创建文档模型
//第一个参数是文档名称,数据库会自动把其变成负数
//第二个参数是Schema
const UserModel = mongoose.model('user', userSchema);

//导出模型
module.exports = UserModel;