/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-17 15:31:04
*/
//引入common中逻辑
require('pages/common/logo')
require('pages/common/footer')

require('./index.css')

var _util = require('util')

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
	},
	submit:function(){
		//1.获取表单数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//2.校验数据合法性
		var validateResult = this.validate(formData)
		if(validateResult.status){
			//3.校验通过,发送请求
			$('.error-item')
			.hide()
			.find('.error-msg')
			.text('')
			//发送请求
			$.ajax({
				url:'/sessions/users',
				method:'post',
				data:formData,
				dataType:'json',
				success:function(result){
					console.log(result)
				},
				error:function(err){
					console.log(err)
				}
			})
		}else{//验证不通过,错误提示
			$('.error-item')
			.show()
			.find('.error-msg')
			.text(validateResult.msg)
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


		result.status = true
		return result
	}
}
$(function(){
	page.init()
})