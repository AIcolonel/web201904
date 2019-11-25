/*
* @Author: Chen
* @Date:   2019-11-05 10:21:51
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-05 10:46:58
*/
const mongoose = require('mongoose')

//链接数据库
// mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/kuazhu', { useUnifiedTopology: true })

//生成db
const db = mongoose.connection

//数据库链接失败
db.on('error',()=>{
	console.log('connection error')
	throw 'connection error'
})

//操作数据库
db.once('open', function() {
  	//1.定义一个数据模型(Schema)
  	const UserSchema = new mongoose.Schema({
	  	name: String,
	  	age:Number,
	  	sex:String
	})

	//2.根据Schema生成文档模型
	//model方法第一个参数是定义集合名称,mongoose会自动将其转化为复数
	//model方法第二个参数是前面定义的数据模型
	const userModel = mongoose.model('user', UserSchema)

	//3.根据文档模型操作数据(CRUD)
	//3.1新增
	/*
	const user = new userModel({ name: 'Tom',age:88,sex:"male"})

	user.save((err,doc)=>{
		if(err){
			console.log(err)
		}else{
			console.log(doc)
		}
	})
	*/

	//3.2查找
	/*
	userModel.find({name:"Tom"},(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/


	//3.3更新
	/*
	userModel.updateOne({name:"Tom"},{$set:{age:100}},(err,result)=>{
		if(err){
			console.log(err)
		}else{
			console.log(result)
		}
	})
	*/

	//3.4删除
	userModel.deleteOne({name:"Tom"},(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
})