/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 10:23:32
*/
const express = require('express')
const app = express()

app.use(express.static('public'))



app.get('/',(req,res)=>{
	// res.send('response get ...')
	// res.send('<h1>response get ...</h1>')
	/*
	res.send({
		name:"Tom"
	})
	*/

	// res.end('response get ...')
	// res.end('<h1>response get ...</h1>')
	/*
	res.end({
		name:"Tom"
	})
	*/


	/*
	res.json({
		name:"Tom"
	})
	*/
	res.json('<h1>response get ...</h1>')

})



app.listen(3000, () => console.log('app listening on port 3000!'))