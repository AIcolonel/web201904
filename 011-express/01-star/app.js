const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('<h1>Hello World,你好</h1>'))

app.listen(port, () => console.log(`app listening on port ${port}!`))