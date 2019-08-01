const mongoose = require('mongoose');

//操作数据库(设置文档格式)创建Schema
const userSchema = new mongoose.Schema({
	name: {
		type:String
	},
	age:{
		type:Number
	},
	major:{
		type:String
	},
	createAt:{
		type:Date,
		default:Date.now
	},
	friends:{
		type:Array,
		default:[]
	}
});


//创建实例方法
userSchema.methods.findBlogs = function(callback){
	// console.log(this)
	this.model('blog').find({author:this._id},callback);
}

//创建静态方法
userSchema.statics.findByAge = function(val,callback){
	// console.log(this);
	console.log(this.model('user') == this)
	this.findOne({age:val},callback);
}

//创建文档模型
//第一个参数是文档名称,数据库会自动把其变成负数
//第二个参数是Schema
const UserModel = mongoose.model('user', userSchema);

//导出模型
module.exports = UserModel;