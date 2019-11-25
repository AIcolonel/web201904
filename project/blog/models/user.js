/*
* @Author: Chen
* @Date:   2019-11-10 11:24:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 10:51:49
*/
const mongoose = require('mongoose')


//1.定义文档模型
	const UserSchema = new mongoose.Schema({
	  	username:{
	  		type:String,
	  		required:[true,"必须输入用户名"],
	  		minlength:[3,"用户名长度不小于3位"],
	  		maxlength:[10,"用户名长度不超过10位"]
	  	},
	  	password:{
	  		type:String
	  	},
	  	isAdmin:{
	  		type:Boolean,
	  		default:false
	  	}
	})

//2.根据文档模型生成对应模型(集合)
//2.1第一个参数就是需要生成的集合名称,mongoose子自动将集合名称转化为复数
//2.2第二个参数就是前面定义的文档模型
const UserModel = mongoose.model('user', UserSchema)


module.exports = UserModel