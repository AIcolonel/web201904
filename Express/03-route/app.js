/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-06 17:41:53
*/
const express = require('express')
const app = express()

app.use(express.static('public'))
// app.use('/static', express.static('public'))



app.get('/get', (req, res) => res.send('response get ...'))
app.post('/post', (req, res) => res.send('response post ...'))
app.put('/put', (req, res) => res.send('response put ...'))
app.delete('/delete', (req, res) => res.send('response delete ...'))

app.listen(3000, () => console.log('app listening on port 3000!'))