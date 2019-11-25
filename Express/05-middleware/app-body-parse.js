/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 11:37:00
*/
const quertstring = require('querystring')
const bodyParser = require('body-parser')


const express = require('express')
const app = express()

app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/',(req,res)=>{
	// console.log(req.params)
	// console.log(req.query)
	/*
	let body = ''
	req.on('data',(chunk)=>{
		body += chunk
	})
	req.on('end',()=>{
		console.log(quertstring.parse(body))
	})
	*/

	console.log(req.body)


	res.send({
		code:0
	})
})


app.listen(3000, () => console.log('app listening on port 3000!'))