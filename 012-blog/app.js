const express = require('express')
const app = express();
const port = 3000;
const swig = require('swig');

//引入cookies
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

//引入中间件
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//链接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (err)=>{
	console.log(err)
});
db.once('open', ()=> {
  	console.log("successful connect mongodb");
});

//配置静态资源
app.use(express.static('public'));

//模板引擎
//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
});
//配置应用模板
app.engine('html', swig.renderFile);
// 配置模板的存放目录
app.set('views', './views');
// 注册模板引擎
app.set('view engine', 'html');
// 渲染模板
//第一个参数是相对于模板目录的文件
//第二个参数是传递给模板的数据


app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
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
	// req.cookies = new Cookies(req,res);
	req.userInfo = {};
	let userInfo = req.session.userInfo;
	if(userInfo){
		req.userInfo = userInfo;
	}
	next();
})

app.use('/',require('./routers/index.js'));
app.use('/user',require('./routers/user.js'));
app.use('/admin',require('./routers/admin.js'));
app.use('/category',require('./routers/category.js'));
app.use('/article',require('./routers/article.js'));

app.listen(port, () => console.log(`app listening on port ${port}!`));




/*视频到富文本编辑器*/