/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 11:05:55
*/
const express = require('express')
const app = express()

app.use(express.static('public'))

app.use((req,res,next)=>{
	console.log('do something for Task A')
	next()
})
app.use((req,res,next)=>{
	console.log('do something for Task B')
	next()
})

app.get('/',(req,res)=>{
	res.send('response get data ...')
})


app.listen(3000, () => console.log('app listening on port 3000!'))