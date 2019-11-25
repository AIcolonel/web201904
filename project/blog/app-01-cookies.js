/*
* @Author: Chen
* @Date:   2019-11-08 10:38:57
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-12 10:26:43
*/
const swig  = require('swig')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const Cookies = require('cookies')


const app = express()

app.use(express.static('public'))

//处理post/put请求中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//经过中间件处理后post/put请求参数会存储在req.body 上


//--------------------数据库连接流程开始---------------------//
//链接数据库
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology:true})

//生成db
const db = mongoose.connection

//数据库链接失败
db.on('error',()=>{
	console.log('connection error')
	throw 'connection error'
})
//链接成功
db.once('open', function() {
	console.log('connection db success')
})
//--------------------数据库连接流程结束---------------------//



//--------------------模板引擎配置开始---------------------//
//配置模板引擎
//开发阶段设置不走缓存
swig.setDefaults({
  	cache: false
})

// 配置应用模板
//第一个参数是模板名称,同时也是模板文件的扩展名
//第二个参数是解析模板的方法
app.engine('html', swig.renderFile)

//配置模板的存放目录
//第一参数必须是views
//第二个参数是模板存放的目录
app.set('views', './views')

//注册模板引擎
//第一个参数必须是view engine
//第二个参数是模板名称,也就是app.engine的第一个参数
app.set('view engine', 'html')
//模板配置后则可以使用过res.render方法渲染模板页面,并且可以携带参数
//--------------------模板引擎配置结束---------------------//

//--------------------设置cookies保存用户信息开始---------------------//
//设置cookies
app.use((req,res,next)=>{
	//生成cookies对象并存在req上
	req.cookies = new Cookies(req,res)

	//获取cookies信息并将其存到req上,则在任何地方都可以获取到cookies
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'))
	}
	req.userInfo = userInfo

	next()
})
//--------------------设置cookies保存用户信息结束---------------------//

//--------------------路由配置开始---------------------//
app.use('/',require('./routes/index.js'))
app.use('/user',require('./routes/user.js'))
//--------------------路由配置结束---------------------//


app.listen(3000, () => console.log('app listening on port 3000!'))