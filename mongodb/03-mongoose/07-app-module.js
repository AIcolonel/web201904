/*
* @Author: Chen
* @Date:   2019-11-05 10:21:51
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-05 15:50:07
*/
const mongoose = require('mongoose')
const userModel = require('./models/user.js')

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
	//3.根据文档模型操作数据(CRUD)
	userModel.distinct('major',{age:{$lt:40}},(err,result)=>{
		if(err){
			console.log(err)
		}else{
			console.log(result)
		}
	})
})