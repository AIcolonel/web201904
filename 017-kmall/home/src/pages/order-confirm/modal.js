/*
* @Author: TomChen
* @Date:   2019-08-26 16:53:39
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 10:34:39
*/
var api = require('api')
var _util = require('util')
var _city = require('util/city')

var modalTpl = require('./modal.tpl')

var formErr = {
    hide: function() {
        $('.error-item')
            .hide()
            .find('.error-msg')
            .text('')
    },
    show: function(msg) {
        $('.error-item')
            .show()
            .find('.error-msg')
            .text(msg)
    }
}

module.exports = {
    show:function(shipping){
        //编辑时回填数据
        this.shipping = shipping

        this.$elem = $('.modal-box')
        this.loadModal()
        this.bindEvent()
        this.loadProvinces()
    },
    loadModal:function(){
        var html = _util.render(modalTpl,this.shipping)
        this.$elem.html(html)
    },
    loadProvinces:function(){
        //加载省份列表
        var provinces = _city.getProvinces()
        var provincesSelectOptions = this.getSelectOptions(provinces)
        var $provinceSelect = this.$elem.find('.province-select')
        $provinceSelect.html(provincesSelectOptions)

        //编辑时的处理
        if(this.shipping){
            $provinceSelect.val(this.shipping.province)
            this.loadCities(this.shipping.province)
        }
    },
    loadCities:function(provinceName){
        //加载省份对应的城市
        var cities = _city.getCities(provinceName)
        var citiesSelectOptions = this.getSelectOptions(cities)
        var $citySelect = this.$elem.find('.city-select')
        $citySelect.html(citiesSelectOptions)
        //编辑时的处理
        if(this.shipping){
            $citySelect.val(this.shipping.city)
        }        
    },
    getSelectOptions:function(arr){
        var html = '<option value="">请选择</option>'
        for(var i = 0,length = arr.length;i<length;i++){
            html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
        }
        return html
    },
    hideModal:function(){
        this.$elem.empty()
    },
    bindEvent:function(){
        var _this = this
        //1.关闭弹出面板
        this.$elem.on('click','.close',function(){
            _this.hideModal()
        })
        //组织事件冒泡为了点击弹出面包中的其他地方不触发顶层的关闭事件
        this.$elem.on('click','.modal-container',function(ev){
            ev.stopPropagation()
        })
        //2.省份和城市的联动 
        this.$elem.on('change','.province-select',function(){
            _this.loadCities($(this).val())
        })
        //3.提交
        this.$elem.find('#btn-submit').on('click', function() {
            _this.submit()
        })
        this.$elem.find('input').on('keyup', function(ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })       
    },
    submit: function() {
        var _this = this
        //1.获取数据
        var formData = {
            name: $.trim($('[name="name"]').val()),
            province: $.trim($('[name="province"]').val()),
            city: $.trim($('[name="city"]').val()),
            address: $.trim($('[name="address"]').val()),
            phone: $.trim($('[name="phone"]').val()),
            zip: $.trim($('[name="zip"]').val()),
        }
        //2.校验数据
        var validateResult = this.validate(formData)
        //验证成功
        if (validateResult.status) {
            formErr.hide()
            //3.发送请求
            var request = api.addShippings
            var action = '新增'
            if(_this.shipping){
                formData.id = _this.shipping._id
                request = api.updateShippings
                action = '编辑'
            }
            request({
                data:formData,
                success:function(shippings){
                    $('.shipping-box').trigger('get-shippings',[shippings])
                    _util.showSuccessMsg(action+'地址成功')
                    _this.hideModal()
                },
                error:function(){
                    _util.showErrorMsg(action+'地址失败,请稍后再试')
                }
            })


        }
        //验证失败
        else {
            formErr.show(validateResult.msg)
        }
    },
    validate: function(formData) {
        var result = {
            status: false,
            msg: ''
        }
        //校验
        //用户名不能为空
        if (!_util.validate(formData.name, 'require')) {
            result.msg = "用户姓名不能为空"
            return result
        }
        //省份不能为空
        if (!_util.validate(formData.province, 'require')) {
            result.msg = "省份不能为空"
            return result
        }
        //城市不能为空
        if (!_util.validate(formData.city, 'require')) {
            result.msg = "城市不能为空"
            return result
        }
        //详细地址不能为空
        if (!_util.validate(formData.address, 'require')) {
            result.msg = "详细地址不能为空"
            return result
        }        
        //电话号码不能为空
        if (!_util.validate(formData.phone, 'require')) {
            result.msg = "电话号码不能为空"
            return result
        }
        //电话号码格式验证
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = "电话号码格式不正确"
            return result
        }                
        result.status = true
        return result
    }
}