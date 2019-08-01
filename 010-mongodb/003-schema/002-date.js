//链接数据库
const mongoose = require('mongoose');

const UserModel = require('./models/user.js');
const moment = require('moment');

mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{
	console.log(err)
});
db.once('open', ()=> {
  	// we're connected!
  	console.log("success connected!");
	//插入数据
	UserModel.findById("5d41567897ee515aa0efb1d0",(err,user)=>{
		if(err){
			console.log("find data err::",err)
		}else{
			console.log(user.createAt);
			console.log(moment(user.createAt).format("YYYY-MM-DD HH:mm:ss"))
		}
	})
});


