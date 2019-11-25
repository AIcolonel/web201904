/*
* @Author: Chen
* @Date:   2019-11-04 11:28:18
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-04 16:08:15
*/
//引入数据库
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://127.0.0.1:27017"

//旧版本不在使用
// const client = new MongoClient(uri, { useNewUrlParser: true })

//新版本代替
const client = new MongoClient(uri, { useUnifiedTopology: true })


//链接数据库
client.connect(err => {
  if(err){
  	console.log(err)
  	throw err
  }
  console.log('success connect db.....')
  client.close();
})