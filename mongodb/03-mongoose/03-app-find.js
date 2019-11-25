/*
* @Author: Chen
* @Date:   2019-11-05 10:21:51
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-05 11:56:25
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

let getRandom = (min,max)=>{
	return Math.round(min+Math.random()*(max-min))
}
const names = ["Tom","Leo","Anmy","Jane","Peter","Lucy","Alice","Tony","Wade"]
const majors = ["Sport","Art","Computer","Elec","Count"]

let getNames = ()=>names[getRandom(0,names.length-1)]
let getMajors = ()=>majors[getRandom(0,majors.length-1)]





//操作数据库
db.once('open', function() {
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

	//3.根据文档模型操作数据(CRUD)
	//3.1新增
	/*
	userModel.find({age:{$lt:30}},(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/

	/*
	userModel.find({age:{$lt:30}},'name age -_id',(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/

	/*
	userModel.find({age:{$lt:30}},null,{limit:2,skip:1},(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/

	/*
	userModel.findById( "5dc0ee0abd30a42538c6bdf0",(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/

	userModel.findOne({age:{$lt:30}},'name age -_id',(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})

})