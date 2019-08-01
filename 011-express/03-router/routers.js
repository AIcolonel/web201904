const express = require('express')
const app = express()
const port = 3000;
app.use(express.static('public'));


const userRouter = require('./routers/user.js');
const blogRouter = require('./routers/blog.js');

app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.listen(port, () => console.log(`app listening on port ${port}!`))