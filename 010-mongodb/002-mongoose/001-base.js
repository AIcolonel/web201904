//链接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{
	console.log(err)
});
db.once('open', ()=> {
  	// we're connected!
  	console.log("we're connected!");

  	//操作数据库(设置文档格式)创建Schema
	const userSchema = new mongoose.Schema({
		name: String,
		age:Number,
		major:String
	});

	//创建文档模型
	//第一个参数是文档名称,数据库会自动把其变成负数
	//第二个参数是Schema
	const UserModel = mongoose.model('user', userSchema);

	//插入数据
	/*
	const user = new UserModel({ name: 'Leo',age:20,major:"art" });
	user.save(function (err, user) {
		if (err) {
			console.log("insert data error::",err);
		}else{
			console.log(user)
		}
	});
	*/

	//查找数据
	/*
	UserModel.find({}, (err, users) =>{
		if (err) {
			console.log("find data error::",err);
		}else{
			console.log(users)
		}
	})
	*/

	//更新数据(update已经被废弃,使用updateOne,updateMany)
	/*
	UserModel.updateOne({name:"Leo"},{$set:{major:"song"}},(err,result)=>{
		if (err) {
			console.log("updateOne data error::",err);
		}else{
			console.log(result)
		}
	});
	*/

	//删除数据
	UserModel.deleteOne({name:"Leo"},(err,result)=>{
		if (err) {
			console.log("deleteOne data error::",err);
		}else{
			console.log(result)
		}
	});


});


