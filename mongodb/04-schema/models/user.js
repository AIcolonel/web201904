/*
* @Author: Chen
* @Date:   2019-11-06 09:32:28
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 15:19:23
*/
const mongoose = require('mongoose')


//1.定义一个数据模型(Schema)
	const UserSchema = new mongoose.Schema({
  	name: {
  		type:String,
        required:[true,"请输入用户名"],
        minlength:[3,"用户名最短为3位"],
        maxlength:[10,"用户名最长位10位"]
  	},
  	age:{
  		type:Number,
        min:[10,"年龄最小为10"],
        max:[50,"年龄最大为50"]
  	},
  	major:{
  		type:String,
        enum:["Sport","Art","Computer"]
  	},
    phone:{
        type:Number,
        validate:{
            validator:(val)=>{
                return /1[35678]\d{9}/.test(val)
            },
            message:'{VALUE}手机号不合法'
        }
    },
  	isLocked:{
  		type:Boolean
  	},
  	createAt:{
  		type:Date,
  		default:Date.now
  	},
  	friends:{
  		type:Array
  	}
})



    // 都不能用箭头函数因为需要用到this
    //定义实例方法
    UserSchema.methods.getBlogs = function(callback){
        // console.log(this)
        this.model('blog').find({author:this._id},callback)
    }

    //定义静态方法
    UserSchema.statics.findByPhone = function(val,callback){
        // console.log(this)
        // this.model('user') == this
        this.findOne({phone:val},callback)
    }








//2.根据Schema生成文档模型
//model方法第一个参数是定义集合名称,mongoose会自动将其转化为复数
//model方法第二个参数是前面定义的数据模型
const UserModel = mongoose.model('user', UserSchema)


module.exports = UserModel