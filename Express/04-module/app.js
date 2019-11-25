/*
* @Author: Chen
* @Date:   2019-11-06 16:08:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-07 10:43:56
*/
const express = require('express')
const app = express()
const userRouter = require('./routers/user.js')
const blogRouter = require('./routers/blog.js')

app.use(express.static('public'))

app.use('/users',userRouter)
app.use('/blogs',blogRouter)
/*
app.get('/users', (req, res) => res.send('response get ...'))
app.post('/users', (req, res) => res.send('response post ...'))
app.put('/users', (req, res) => res.send('response put ...'))
app.delete('/users', (req, res) => res.send('response delete ...'))

app.get('/blogs', (req, res) => res.send('response get ...'))
app.post('/blogs', (req, res) => res.send('response post ...'))
app.put('/blogs', (req, res) => res.send('response put ...'))
app.delete('/blogs', (req, res) => res.send('response delete ...'))
*/

app.listen(3000, () => console.log('app listening on port 3000!'))