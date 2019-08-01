//链接数据库
const mongoose = require('mongoose');

const UserModel = require('./models/user.js');

mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{
	console.log(err)
});
db.once('open', ()=> {
  	// we're connected!
  	console.log("we're connected!");
	//插入数据
	UserModel.insertMany(
		{
			name:"Tom",
			age:18,
			major:"computer"
		},
		(err,docs)=>{
		if(err){
			console.log("insertMany data err::",err);
		}else{
			console.log(docs);
		}
	})
});


