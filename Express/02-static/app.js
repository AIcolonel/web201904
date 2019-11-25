/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 16:13:00
*/
const express = require('express')
const app = express()

// app.use(express.static('public'))
app.use('/static', express.static('public'))



app.get('/', (req, res) => res.send('hello world'))

app.listen(3000, () => console.log('app listening on port 3000!'))