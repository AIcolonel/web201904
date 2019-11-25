/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 16:08:16
*/
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('app listening on port 3000!'))