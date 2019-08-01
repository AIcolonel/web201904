const express = require('express')
const app = express()
const port = 3000;
app.use(express.static('public'));
// app.use('/static', express.static('public'));


app.get('/', (req, res ) =>{ 
	console.log(req.query);
	// res.send('<h1>get response data .....</h1>');
	// res.end('<h1>get response data .....</h1>');
	res.json({name:"tom"});
});


app.post('/', (req, res) => res.send('post response data .....'));
app.put('/', (req, res) => res.send('put response data .....'));
app.delete('/', (req, res) => res.send('delete response data .....'));

app.listen(port, () => console.log(`app listening on port ${port}!`))