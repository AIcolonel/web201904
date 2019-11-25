/*
* @Author: Chen
* @Date:   2019-11-05 15:47:57
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-05 15:48:56
*/
const mongoose = require('mongoose')


//1.定义一个数据模型(Schema)
	const UserSchema = new mongoose.Schema({
  	name: String,
  	age:Number,
  	major:String
})

//2.根据Schema生成文档模型
//model方法第一个参数是定义集合名称,mongoose会自动将其转化为复数
//model方法第二个参数是前面定义的数据模型
const userModel = mongoose.model('user', UserSchema)


module.exports = userModel