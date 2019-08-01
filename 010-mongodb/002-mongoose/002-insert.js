//链接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{
	console.log(err)
});

//创建数据用
const getRandom = (min,max)=>{
	return Math.round(min + (max-min)*Math.random());
}
const names = ["Tom","Leo","Anmy","Kitty","Jane","Alice","Lucy","Kimi"];
const majors = ["computer","song","art","elec","sport","law"];
const getName = ()=>{
	return names[getRandom(0,names.length-1)];
};
const getMajor = ()=>{
	return majors[getRandom(0,majors.length-1)];
};


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
	UserModel.insertMany([{name:getName(),age:getRandom(20,100),major:getMajor()},{name:getName(),age:getRandom(20,100),major:getMajor()}],(err,docs)=>{
		if(err){
			console.log("insert data err::",err)
		}else{
			console.log(docs);
		}
	})
	*/
	//返回promise
	/*
	let promise = UserModel.insertMany(
		[
			{name:getName(),age:getRandom(20,100),major:getMajor()},
			{name:getName(),age:getRandom(20,100),major:getMajor()},
			{name:getName(),age:getRandom(20,100),major:getMajor()}
		]
	);
	promise
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log("insert data err::",err)
	})
	*/
	let promise = UserModel.create(
		[
			{name:getName(),age:getRandom(20,100),major:getMajor()},
			{name:getName(),age:getRandom(20,100),major:getMajor()},
			{name:getName(),age:getRandom(20,100),major:getMajor()}
		]
	);
	promise
	.then(docs=>{
		console.log(docs)
	})
	.catch(err=>{
		console.log("insert data err::",err)
	})
});


