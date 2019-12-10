/*
* @Author: Chen
* @Date:   2019-11-28 15:26:21
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 15:29:16
*/
const http = require('http')
const server = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*')
	res.end(JSON.stringify(['learn js','learn react']))
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in the http://127.0.0.1:3000')
})