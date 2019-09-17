/*
 * @Author: TomChen
 * @Date:   2019-08-21 17:42:33
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-26 09:40:06
 */
require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')

require('./index.css')

var _util = require('util')
var api = require('api')

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

var page = {
    init: function() {
        this.renderSide()
        this.bindEvent()
    },
    renderSide:function(){
        _side.render('user-update-password')
    },    
    bindEvent: function() {
        var _this = this
        
        $('#btn-submit').on('click', function() {
            _this.submit()
        })
        $('.side-content input').on('keyup', function(ev) {
            if (ev.keyCode == 13) {
                _this.submit()
            }
        })
    },
    submit: function() {
        //1.获取数据
        var formData = {
            password: $.trim($('[name="password"]').val()),
            repassword: $.trim($('[name="repassword"]').val()),
        }
        //2.校验数据
        var validateResult = this.validate(formData)
        //验证成功
        if (validateResult.status) {
            formErr.hide()
            //3.发送请求
            api.updateUsers({
                data: formData,
                success:function(data) {
                    //window.location.href = './result.html?type=updatePassword'
                    _util.goResult('updatePassword')
                },
                error:function(msg){
                    formErr.show(msg) 
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
        //密码不能为空
        if (!_util.validate(formData.password, 'require')) {
            result.msg = "密码不能为空"
            return result
        }
        //密码格式验证
        if (!_util.validate(formData.password, 'password')) {
            result.msg = "密码格式不正确"
            return result
        }
        //两次密码不一致
        if(formData.password != formData.repassword){
            result.msg = "两次密码不一致"
            return result            
        }               
        result.status = true
        return result
    }
}

$(function() {
    page.init()
})