/*
* @Author: Chen
* @Date:   2019-11-07 15:46:28
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-08 09:28:09
*/
const swig  = require('swig')
const express = require('express')
const app = express()

app.use(express.static('public'))


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

//渲染模板
app.get('/base',(req,res)=>{
    //4.渲染模板
    //第一个参数是相对于模板目录的文件
    //第二个参数是传递给模板的数据
    res.render('base',{
        title:'跨猪网',
        name:"Anmy",
        names:["Tom","Leo","Anmy","Peter"]
    })
})


app.listen(3000, () => console.log('app listening on port 3000!'))