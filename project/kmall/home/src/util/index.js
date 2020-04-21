/*
* @Author: Chen
* @Date:   2019-12-17 11:36:43
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 15:21:22
*/
var Hogan = require('hogan.js')

module.exports = {
	validate:function(value,type){
		if(type == 'required'){
			return !!value
		}
		//用户名验证:以字母开头的3-6位字符
		if(type == 'username'){
			return /^[a-z][a-z0-9_]{2,5}$/.test(value)
		}
		//密码验证:3-6位任意字符
		if(type == 'password'){
			return /^\w{3,6}$/.test(value)
		}
		//手机号验证:
		if(type == 'phone'){
			return /^1[356789]\d{9}$/.test(value)
		}
		//邮箱验证:
		if(type == 'email'){
			return /^\w+@\w+\.\w{2,6}$/.test(value)
		}
	},
	showErrMsg:function(msg){
		alert(msg)
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	goLogin:function(){
		window.location.href = '/user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	goResult:function(type){
		window.location.href = '/result.html?type='+type
	},
	showConfirm:function(msg){
		return window.confirm(msg)
	},
	getParamsFromUrl:function(key){
		var query = window.location.search.substr(1)
		//type=register
		//type=register&name=tom
		//name=tom&type=register
		//age=18&type=register&name=tom
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