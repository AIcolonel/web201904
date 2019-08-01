const MongoClient = require('mongodb').MongoClient;

// console.log(MongoClient);
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
//创建集合的名称
const dbName = 'kuazhu';

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
	// console.log("Connected successfully to server");
	const db = client.db(dbName);

	// Get the documents collection
  	const collection = db.collection('users');


  	// Insert some documents
  	/*
  	collection.insertMany([{name:"Tom",age:18,major:"computer"},{name:"Leo",age:20,major:"sport"}], (err, result)=> {
    	if(err){
    		console.log(err)
    	}else{
    		console.log(result)
    	}
	});
	*/


	//Find All Documents
	/*
	collection.find({}).toArray(function(err, docs) {
	    console.log(docs)
	});
	
	collection.find({name:"Tom"}).toArray(function(err, docs) {
	    console.log(docs)
	});
	*/

	// Update a document
	/*
	collection.updateOne({name:"Leo"},{$set:{major:"art"}}, (err, result)=> {
		if(err){
			console.log(err)
		}else{
			console.log(result)
		}
	});
	*/

	//Remove a document
	collection.deleteOne({ name:"Anmy" }, function(err, result) {
		if(err){
			console.log(err)
		}else{
			console.log(result)
		}
	});  



	client.close();
});
