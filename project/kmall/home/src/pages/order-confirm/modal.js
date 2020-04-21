/*
* @Author: Chen
* @Date:   2019-12-25 11:08:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 10:04:28
*/
var api = require('api')
var _util = require('util')
var _city = require('util/city')

var modalTpl = require('./modal.tpl')

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

module.exports = {
	show:function(shipping){
		//编辑地址数据
		this.shipping = shipping
		// console.log(this.shipping)
		this.$modalBox = $('.modal-box')
		//加载新增地址弹出层
		this.loadModal()
		//监听事件
		this.bindEvent()
		//加载省份
		this.loadProvinces()
	},
	loadProvinces:function(){
		//生成省份选项
		var provinces = _city.getProvinces()
		var provincesSelectOption = this.getSelectOption(provinces)
		var provinceSelect = this.$modalBox.find('.province-select')
		provinceSelect.html(provincesSelectOption)

		//处理编辑数据回填 
		if(this.shipping){
			provinceSelect.val(this.shipping.province)
			//加载对应省份的城市
			this.loadCities(this.shipping.province)
		}
	},
	loadCities:function(province){
		//生成省份对应的城市选项
		var cities = _city.getCities(province)
		var citiesSelectOption = this.getSelectOption(cities)
		var citySelect = this.$modalBox.find('.city-select')
		citySelect.html(citiesSelectOption)

		//处理编辑数据回填
		if(this.shipping){
			citySelect.val(this.shipping.city)
		}
	},
	getSelectOption:function(arr){
		var html = '<option value="">请选择</option>'
		for(var i=0;i<arr.length;i++ ){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	loadModal:function(){
		//编辑地址时将this.shipping传递给模板
		var html = _util.render(modalTpl,this.shipping)
		this.$modalBox.html(html)
	},
	bindEvent:function(){
		var _this = this
		//1.新增地址
		this.$modalBox.on('click','.close',function(){
			//关闭弹出层
			_this.hideModal()
		})
		//监听事件阻止事件冒泡:防止输入地址时关闭弹出层
		this.$modalBox.on('click','.modal-container',function(ev){
			// return false
			ev.stopPropagation()
		})

		//2.点击省份加载对应城市
		this.$modalBox.on('change','.province-select',function(){
			//获取点击的省份
			var province = $(this).val()
			_this.loadCities(province)
		})


		//3.点击提交新增地址
		this.$modalBox.find('#btn-submit').on('click',function(){
			_this.submit()
		})
		//监听键盘事件:回车键提交
		this.$modalBox.find('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	hideModal:function(){
		// this.$modalBox.html('')
		this.$modalBox.empty()
	},
	//处理新增地址逻辑
	submit:function(){
		var _this = this
		//1.获取表单数据
		var formData = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		//2.校验数据合法性
		var validateResult = this.validate(formData)
		if(validateResult.status){
			//3.校验通过,发送请求
			formErr.hide()
			//发送请求
			/*
			api.addShippings({
				data:formData,
				success:function(shippings){
					// console.log(shippings)
					//新增地址成功后处理
					//1.隐藏弹出层
					_this.hideModal()
					//2.将最新的地址通过自定义事件传递给容器
					$('.shipping-box').trigger('get-shipping',[shippings])
					//3.成功提示
					_util.showSuccessMsg('新增地址成功')
				},
				error:function(){
					_util.showErrMsg('新增地址失败,请稍后再试')
				}
			})
			*/
			//处理编辑和新增
			var request = api.addShippings
			var action = '新增'
			if(_this.shipping){
				//编辑地址需要传入地址id
				formData.id = _this.shipping._id
				action = '更新'
				request = api.updateShippings
			}
			request({
				data:formData,
				success:function(shippings){
					// console.log(shippings)
					//新增地址成功后处理
					//1.隐藏弹出层
					_this.hideModal()
					//2.将最新的地址通过自定义事件传递给容器
					$('.shipping-box').trigger('get-shipping',[shippings])
					//3.成功提示
					_util.showSuccessMsg(action+'地址成功')
				},
				error:function(){
					_util.showErrMsg(action+'地址失败,请稍后再试')
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
		if(!_util.validate(formData.name,'required')){
			result.msg = '用户姓名不能为空'
			return result
		}
		//省份不能为空
		if(!_util.validate(formData.province,'required')){
			result.msg = '省份不能为空'
			return result
		}
		//城市不能为空
		if(!_util.validate(formData.city,'required')){
			result.msg = '城市不能为空'
			return result
		}
		//地址不能为空
		if(!_util.validate(formData.address,'required')){
			result.msg = '地址不能为空'
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
		result.status = true
		return result
	}
}