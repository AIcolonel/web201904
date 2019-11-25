/*
* @Author: Chen
* @Date:   2019-11-04 11:28:18
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-05 10:03:06
*/
//引入数据库
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://127.0.0.1:27017"
const dbName = "it"

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

  //生成db(数据库),有就切换没有就新建
  const db = client.db(dbName)

  //生成collection(集合),有就切换没有就新建
  const collection = db.collection('users')

  //利用collection操作集合
  //插入
  /*
  collection.insertMany([{name:"Tom",score:99},{name:"Leo",score:88}],(err,docs)=>{
  	if(err){
  		console.log('insert err:::',err)
  	}else{
  		console.log('success::',docs)
  	}

  	//不管成功失败都关闭数据库
  	client.close();
  })
  */


  //查看
  /*
  collection.find({score:{$gt:90}}).toArray((err,docs)=>{
    if(err){
      console.log('find err:::',err)
    }else{
      console.log('find success::',docs)
    }

    //不管成功失败都关闭数据库
    client.close();
  })
  */


  //更新
  /*
  collection.updateOne({name:"Tom"},{$set:{score:100}},(err,result)=>{
    if(err){
      console.log('find err:::',err)
    }else{
      console.log('find success::',result)
    }

    //不管成功失败都关闭数据库
    client.close();
  })
  */


  //删除
  collection.deleteOne({score:{$lt:90}},(err,docs)=>{
    if(err){
      console.log('find err:::',err)
    }else{
      console.log('find success::',docs)
    }

    //不管成功失败都关闭数据库
    client.close();
  })
  
  
})