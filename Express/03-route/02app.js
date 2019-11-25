/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 09:33:43
*/
const express = require('express')
const app = express()

app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always do something ....')
	//想要向下进行必须调用next方法
	next()
})

app.get('/', (req, res,next) => {
	console.log('do something for get  ....')
	next()
},(req,res)=>{
	res.send('response get ...')
})
app.post('/', (req, res) => res.send('response post ...'))
app.put('/', (req, res) => res.send('response put ...'))
app.delete('/', (req, res) => res.send('response delete ...'))

app.listen(3000, () => console.log('app listening on port 3000!'))