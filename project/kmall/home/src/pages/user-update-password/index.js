/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 10:09:22
*/
//引入common中逻辑
require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
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
		this.renderSide()
	},
	renderSide:function(){
		_side.render('user-update-password')
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
		//监听键盘事件:回车键提交
		$('.side-content input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		//1.获取表单数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2.校验数据合法性
		var validateResult = this.validate(formData)
		if(validateResult.status){
			//3.校验通过,发送请求
			formErr.hide()
			//发送请求
			api.updateUsers({
				data:formData,
				success:function(data){
					// console.log(data)
					//验证成功,跳转到结果提示页面
					// window.location.href = '/result.html?type=updatePassword'
					_util.goResult('updatePassword')
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
		result.status = true
		return result
	}
}
$(function(){
	page.init()
})