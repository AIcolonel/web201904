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

	UserModel.distinct("name",{age:{$lt:30}},(err,result)=>{
		if(err){
			console.log("distinct date err::",err)
		}else{
			console.log(result);
		}
	})
});


