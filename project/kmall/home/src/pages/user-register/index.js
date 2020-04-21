/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 10:08:34
*/
//引入common中逻辑
require('pages/common/logo')
require('pages/common/footer')

require('./index.css')
var api = require('api')

var _util = require('util')

var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var page = {
	init:function(){
		//绑定事件
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
		//监听键盘事件:回车键提交
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
		//用户名失去焦点时验证是否合法
		$('[name="username"]').on('blur',function(){
			var username = $.trim($(this).val())
			//当没有输入用户名或者用户名验证不合法时则不发送ajax
			if(!_util.validate(username,'required')){
				return 
			}
			if(!_util.validate(username,'username')){
				return
			}
			api.checkUsername({
				data:{
					username:username
				},
				success:function(){
					formErr.hide()
				},
				error:function(msg){
					formErr.show(msg)
				}
			})
		})
	},
	submit:function(){
		//1.获取表单数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		//2.校验数据合法性
		var validateResult = this.validate(formData)
		if(validateResult.status){
			//3.校验通过,发送请求
			formErr.hide()
			//发送请求
			api.register({
				data:formData,
				success:function(data){
					// console.log(data)
					//验证成功,跳转到结果提示页面
					// window.location.href = '/result.html?type=register'
					_util.goResult('register')
				},
				error:function(msg){
					formErr.show(msg)
				}
			})
		}else{//验证不通过,错误提示
			formErr.show(validateResult.msg)
		}
	},
	validate:function(formData){
		var result ={
			status:false,
			msg:''
		}
		//验证
		//用户名不能为空
		if(!_util.validate(formData.username,'required')){
			result.msg = '用户名不能为空'
			return result
		}
		//用户名格式验证
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确'
			return result
		}
		//密码不能为空
		if(!_util.validate(formData.password,'required')){
			result.msg = '密码不能为空'
			return result
		}
		//密码格式验证
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确'
			return result
		}
		//两次密码验证
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致'
			return result
		}
		//手机号不能为空
		if(!_util.validate(formData.phone,'required')){
			result.msg = '手机号不能为空'
			return result
		}
		//手机号格式验证
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result
		}
		//邮箱不能为空
		if(!_util.validate(formData.email,'required')){
			result.msg = '邮箱不能为空'
			return result
		}
		//邮箱格式验证
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确'
			return result
		}


		result.status = true
		return result
	}
}
$(function(){
	page.init()
})