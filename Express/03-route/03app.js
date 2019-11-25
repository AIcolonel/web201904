/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 09:50:48
*/
const express = require('express')
const app = express()

app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always do something ....')
	//想要向下进行必须调用next方法
	next()
})
// /users/34/books/8989
app.get('/users/:userId/books/:bookId',(req,res)=>{
	console.log(req.params)
	res.send('response get ...')
})
// /?userId=123&bookId=999
app.get('/',(req,res)=>{
	console.log(req.query)
	res.send('response get ...')
})


app.post('/', (req, res) => res.send('response post ...'))
app.put('/', (req, res) => res.send('response put ...'))
app.delete('/', (req, res) => res.send('response delete ...'))

app.listen(3000, () => console.log('app listening on port 3000!'))