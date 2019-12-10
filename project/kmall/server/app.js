/*
* @Author: Tom
* @Date:   2018-08-06 09:14:54
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 19:38:07
*/
//项目入口文件
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

//启动数据库
mongoose.connect('mongodb://localhost:27017/kmall',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	throw err
});

db.once('open',()=>{
	console.log('DB connected....');
});


const app = express();

//跨域设置
app.use((req,res,next)=>{
	res.append("Access-Control-Allow-Origin","http://localhost:3001");
	res.append("Access-Control-Allow-Credentials",true);
	res.append("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,X-File-Name"); 
	next();
})

//配置静态资源
app.use(express.static('public'));

//OPTIONS请求处理
app.use((req,res,next)=>{
    if(req.method == 'OPTIONS'){
        res.send('OPTIONS OK');
    }else{
        next();
    }
})

//设置cookie的中间件,后面所有的中间件都会有cookie
app.use(session({
    //设置cookie名称
    name:'kmid',
    //用它来对session cookie签名，防止篡改
    secret:'dsjfkdfd',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},    
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })   
}))

app.use((req,res,next)=>{
	req.userInfo  = req.session.userInfo || {};
	next();	
});

//添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//处理路由
app.use("/sessions",require('./routes/sessions.js'));
app.use("/counts",require('./routes/counts.js'));
app.use("/users",require('./routes/users.js'));
app.use("/categories",require('./routes/categories.js'));
app.use("/products",require('./routes/products.js'));
app.use("/orders",require('./routes/orders.js'));
app.use("/carts",require('./routes/carts.js'));
app.use("/shippings",require('./routes/shippings.js'));
app.use("/orders",require('./routes/orders.js'));
app.use("/payments",require('./routes/payments.js'));
app.use("/ads",require('./routes/ads.js'));
app.use("/floors",require('./routes/floors.js'));


app.listen(3000,()=>{
	console.log('server is running at 127.0.0.1:3000')
});
