/*
* @Author: Chen
* @Date:   2019-11-06 09:32:28
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 15:52:44
*/
const mongoose = require('mongoose')


//1.定义一个数据模型(Schema)
	const BlogSchema = new mongoose.Schema({
  	title:{
        type:String
    },
    content:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})



//定义静态方法
BlogSchema.statics.findBlogs = function(query){
    //由于期待的是一个promise,因此需要有返回值populate方法返回的就是一个promise
    return this.findOne(query).populate('author','name')
}

//2.根据Schema生成文档模型
//model方法第一个参数是定义集合名称,mongoose会自动将其转化为复数
//model方法第二个参数是前面定义的数据模型
const BlogModel = mongoose.model('blog', BlogSchema)


module.exports = BlogModel