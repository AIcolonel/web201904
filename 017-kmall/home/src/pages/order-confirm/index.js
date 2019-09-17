/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 11:29:02
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')
var _modal = require('./modal.js')

var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
require('./index.css')

var page = {
  
    init:function(){
        this.selectedShippingId = ''
        this.$shippingBox = $('.shipping-box')
        this.$productBox = $('.product-box')
        this.loadShippingList()
        this.loadProductList()
        this.bindEvent()
    },
    loadShippingList:function(){
        var _this = this
        api.getShippingsList({
            success:function(shippings){
                /*
                var html = _util.render(shippingTpl,{
                    shippings:shippings
                })
                _this.$shippingBox.html(html)
                */
               _this.renderShipping(shippings)
            }
        })
    },
    renderShipping(shippings){
        var _this = this
        //标示当前选中的地址,在渲染页面时设置为active
        shippings.forEach(function(shipping){
            if(shipping._id == _this.selectedShippingId){
                shipping.active = true
            }
        })
        var html = _util.render(shippingTpl,{
            shippings:shippings
        })
        this.$shippingBox.html(html)
    },
    loadProductList:function(){
        var _this = this
        api.getOrdersProducts({
            success:function(result){
                if(result.cartList.length > 0){
                    var html = _util.render(productTpl,result)
                    _this.$productBox.html(html) 
                }else{
                   _this.$productBox.html('<p class="empty-message">购物车中还没有选中的商品!</p>')  
                }

            },
            error:function(){
               _this.$productBox.html('<p class="empty-message">获取商品列表好像出错了,请稍后再试!</p>') 
            }
        })
    },
    bindEvent:function(){
        var _this = this
        //监听新增地址后获取最新数据
        this.$shippingBox.on('get-shippings',function(ev,shippings){
            _this.renderShipping(shippings)
        })
        //1.弹出添加地址面板
        this.$shippingBox.on('click','.shipping-add',function(){
            _modal.show()
        })
        //2.处理删除地址
        this.$shippingBox.on('click','.shipping-delete',function(ev){
            //阻止事件冒泡,防止点击时选中改地址
            ev.stopPropagation()
            if(_util.showConfirm('您确定要删除该条地址吗?')){
                var $this = $(this)
                var shippingId = $this.parents('.shipping-item').data('shipping-id')
                api.deleteShippings({
                    data:{
                        id:shippingId
                    },
                    success:function(shippings){
                        _this.renderShipping(shippings)
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg)
                    }
                })
            }
        })
        //3.编辑地址
        this.$shippingBox.on('click','.shipping-edit',function(ev){
            //阻止事件冒泡,防止点击时选中改地址
            ev.stopPropagation()
            var $this = $(this)
            var shippingId = $this.parents('.shipping-item').data('shipping-id')
            api.getShippingsDetail({
                data:{
                    id:shippingId
                },
                success:function(shipping){
                    _modal.show(shipping)
                },                
            })
        })
        //4.选中地址
        this.$shippingBox.on('click','.shipping-item',function(){
            var $this = $(this)
            $this.addClass('active')
            .siblings('.shipping-item').removeClass('active')

            //保存选中的地址id,为了页面重新渲染时可以知道当前选中的是那个地址
            _this.selectedShippingId = $this.data('shipping-id')
        })
        //5.去支付(生成订单)
        this.$productBox.on('click','.btn-submit',function(){
            if(_this.selectedShippingId){
                api.addOrders({
                    data:{
                        shippingId:_this.selectedShippingId
                    },
                    success:function(order){
                        window.location.href = "./payment.html?orderNo="+order.orderNo
                    },
                    error:function(msg){
                        _util.showErrorMsg(msg)
                    }
                })
            }
            else{
                _util.showErrorMsg('请选择地址后再提交!')
            }
        })
    }
}


$(function() {
    page.init()
})