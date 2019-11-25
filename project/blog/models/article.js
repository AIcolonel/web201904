/*
* @Author: Chen
* @Date:   2019-11-10 11:24:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-19 09:57:57
*/
const mongoose = require('mongoose')
const pagination = require('../util/pagination.js')
const moment = require('moment')


//1.定义文档模型
	const ArticleSchema = new mongoose.Schema({
	  	title:{
	  		type:String
	  	},
	  	intro:{
	  		type:String
	  	},
	  	user:{
	  		type:mongoose.Schema.Types.ObjectId,
	  		ref:'user'
	  	},
	  	category:{
	  		type:mongoose.Schema.Types.ObjectId,
	  		ref:'category'
	  	},
	  	createdAt:{
	  		type:Date,
	  		default:Date.now
	  	},
	  	click:{
	  		type:Number,
	  		default:0
	  	},
	  	content:{
	  		type:String
	  	}
	})

	ArticleSchema.virtual('createdTime').get(function(){
		//由于前台首页发送ajax请求获取的数据无法使用虚拟属性
		//因此时间处理统一改成moment
		// return new Date(this.createdAt).toLocaleString()
		return moment(this.createdAt).format('YYYY - MM - DD HH:mm:ss')
	})
	//定义分页的静态方法
	ArticleSchema.statics.getPaginationData = function(req,query={}){
		const options = {
			page:req.query.page / 1,
			model:ArticleModel,
			query:query,
			projection:'-__v',
			sort:{_id:-1},
			populates:[{ path: 'user', select: 'username'},{ path: 'category', select: 'name'}]
		}
		return pagination(options)
	}



//2.根据文档模型生成对应模型(集合)
//2.1第一个参数就是需要生成的集合名称,mongoose子自动将集合名称转化为复数
//2.2第二个参数就是前面定义的文档模型
const ArticleModel = mongoose.model('article', ArticleSchema)


module.exports = ArticleModel