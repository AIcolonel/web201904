/*
* @Author: TomChen
* @Date:   2019-08-22 15:11:38
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-26 11:43:38
*/
var Hogan = require('hogan.js')

module.exports = {
    validate:function(value,type){
        //非空验证
        if(type == 'require'){
            return !!value
        }
        //用户名格式验证
        if(type == 'username'){
            return /^[a-z][a-z0-9_]{2,5}$/.test(value)
        }
        //密码格式验证
        if(type == 'password'){
            return /^\w{3,6}$/.test(value)
        }
        //电话号码格式验证
        if(type == 'phone'){
            return /^1[3589]\d{9}$/.test(value)
        }
        if(type == 'email'){
            return /^\w+@\w+\.\w{2,6}$/.test(value)
        }                            
    },
    showErrorMsg:function(msg){
        alert(msg)
    },
    showSuccessMsg:function(msg){
        alert(msg)
    },
    showConfirm:function(msg){
        return window.confirm(msg)
    },
    goLogin:function(){
        window.location.href = '/user-login.html?redirect='+encodeURIComponent(window.location.href)
    },
    goResult:function(type){
        window.location.href = './result.html?type='+type
    },
    getParamFromUrl:function(key){
        var query = window.location.search.substr(1)
        //type=register
        //name=tom&type=register
        //type=register&age=111
        //name=tom&type=register&age=111
        var reg = new RegExp('(^|&)'+key+'='+'([^&]*)(&|$)')
        var result = query.match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    render:function(tpl,data){
        var template = Hogan.compile(tpl)
        var html = template.render(data)
        return html
    }
}