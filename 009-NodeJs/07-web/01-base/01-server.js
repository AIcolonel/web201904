/*
* @Author: Chen
* @Date:   2019-10-29 10:20:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-29 10:36:42
*/
const http = require('http')

const server = http.createServer((req,res)=>{
	//req request 可读流
	//res response 可写流
	res.write('hello')
	res.end('good')
})

/*
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://17.0.0.1:3000')
})
*/

server.listen(3000,'10.196.12.235',()=>{
	console.log('server is running in http://10.196.12.235:3000')
})