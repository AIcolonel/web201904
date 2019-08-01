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
const arrData = [];
for(var i = 0;i<10;i++){
	arrData.push({name:getName(),age:getRandom(20,100),major:getMajor()})
}


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
	UserModel.insertMany(arrData,(err,docs)=>{
		if(err){
			console.log("insert data err::",err)
		}else{
			console.log(docs);
		}
	})
	*/


	//查找数据(不想显示id等字段,则给id前面添加-)
	//第二个参数是显示想要显示的字段
	//第三个参数是查找数据筛选
	/*
	UserModel.find(
		{age:{$gt:18}},
		"name age -_id",
		{skip:1,limit:3,toArray:true,sort:{age:-1}},
		(err,docs)=>{
		if(err){
			console.log("find data err::",err)
		}else{
			console.log(docs);
		}
	})
	
	UserModel.findById(
		"5d41406b87094331242a4c0f",
		(err,docs)=>{
		if(err){
			console.log("findById data err::",err)
		}else{
			console.log(docs);
		}
	})
	
	UserModel.findOne(
		{age:{$gt:18}},
		"name age -_id",
		(err,docs)=>{
		if(err){
			console.log("find data err::",err)
		}else{
			console.log(docs);
		}
	})
	*/


	//更新数据
	/*
	UserModel.updateOne({age:{$gt:50}},{age:50},(err,docs)=>{
		if(err){
			console.log("updateOne data err::",err)
		}else{
			console.log(docs);
		}
	})
	*/
	UserModel.updateMany({age:{$gt:50}},{age:50},(err,docs)=>{
		if(err){
			console.log("updateMany data err::",err)
		}else{
			console.log(docs);
		}
	})
});


