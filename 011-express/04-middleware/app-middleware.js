const http = require('http')

//version 1
/*
const server = http.createServer((req,res)=>{
	res.end('ok')
})
*/

//version 2
/*
const app = (req,res)=>{
	res.end('ok')
}
const server = http.createServer(app)
*/
//version 3
/*
const express = ()=>{
	
	const app = (req,res)=>{
		res.end('ok')
	}
	return app;	
}
const app = express();
const server = http.createServer(app)
*/
const express = ()=>{
	
	const fns = [];

	const app = (req,res)=>{
		let i = 0;
		function next(){
			let fn = fns[i++]
			if(!fn) return;
			fn(req,res,next)
		}
		next();

		res.end('<h1>Hello World,你好</h1>')
	}

	app.use = (fn)=>{
		fns.push(fn);
		console.log(fns);
	}

	return app;	
}

const app = express();

app.use((req,res,next)=>{
	console.log("A1")
	next()
	console.log('A2')
})
app.use((req,res,next)=>{
	console.log("B1")
	next()
	console.log('B2')
})
app.use((req,res,next)=>{
	console.log("C1")
	next()
	console.log('C2')
})

const server = http.createServer(app)


server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running....')
})