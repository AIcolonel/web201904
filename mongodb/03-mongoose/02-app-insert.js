/*
* @Author: Chen
* @Date:   2019-11-05 10:21:51
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-05 11:33:39
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
	const user = new userModel({ name: 'Tom',age:88,major:"Computer"})
	user.save((err,doc)=>{
		if(err){
			console.log(err)
		}else{
			console.log(doc)
		}
	})
	*/

	/*
	userModel.insertMany([{name:"Leo",age:18,major:"Art"},{name:"Anmy",age:20,major:"Sport"}],(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/


	/*
	userModel.insertMany([{name:"Tomi",age:21,major:"Elec"}])
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log(err)
	})
	*/


	/*
	userModel.create([{name:"Susan",age:18,major:"Art"},{name:"Jane",age:20,major:"Sport"}],(err,docs)=>{
		if(err){
			console.log(err)
		}else{
			console.log(docs)
		}
	})
	*/

	/*
	userModel.create([{name:"Tony",age:66,major:"Elec"}])
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log(err)
	})
	*/

	const arr = []
	for(let i = 0;i<40;i++){
		arr.push({
			name:getNames(),
			age:getRandom(20,100),
			major:getMajors()
		})
	}
	// console.log(arr)
	userModel.insertMany(arr)
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log(err)
	})
	
})