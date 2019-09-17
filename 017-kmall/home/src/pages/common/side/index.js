/*
* @Author: TomChen
* @Date:   2019-08-23 11:12:04
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-23 11:49:31
*/
require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl')

var list = [
    {name:'user-center',desc:'用户中心',link:'./user-center.html'},
    {name:'order-list',desc:'我的订单',link:'./order-list.html'},
    {name:'user-update-password',desc:'修改密码',link:'./user-update-password.html'}
]
module.exports = {
    render:function(name){
        list.find(function(item){
            return item.name == name
        }).isActive = true

         var html = _util.render(tpl,{
            list:list
        })

        $('.side').html(html)      
    }
}