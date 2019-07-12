var http = require('http');

var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
	// console.log(req.headers.cookie);
	// var oDate = new Date('2019-07-12 15:49:30').toUTCString();

	// res.setHeader('Set-Cookie',["usernam=tom;Expires="+oDate]);
	// res.setHeader('Set-Cookie',["usernam=tom;Max-Age=10"]);

	if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}

	if(req.method == "POST"){
		var body = "";
		req.on("data",function(chunk){
			body += chunk;
		})
		req.on("end",function(){
			console.log(body);
			res.end(body);
		});
	}else if(req.method == "GET"){
		if(req.url.search(/\?/) != -1){
			var parm = url.parse(req.url,true).query;
			console.log(parm);
			var objToJSON = JSON.stringify(parm);
			res.end(objToJSON);
		}else{
			var filePath  = "./" + req.url;
			fs.readFile(filePath,function(err,data){
				if(err){
					res.statusCode = 404;
					res.end("not found!!!");
				}else{
					res.end(data);
				}
			})
		}
	}else{
		res.end('ok');
	}

	

});

server.listen(3000,"127.0.0.1",function(){
	console.log("server is running at http://127.0.0.1:3000");
});