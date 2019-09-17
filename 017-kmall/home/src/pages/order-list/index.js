/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 16:14:07
*/
require('pages/common/nav')
require('pages/common/search')
require('util/pagination')
var _side = require('pages/common/side')
require('pages/common/footer')
var tpl = require('./index.tpl')

require('./index.css')

var _util = require('util')
var api = require('api')

var page = {
    ordersListPrarms:{
        page:_util.getParamFromUrl('page') || 1,
    },    
    init:function(){
        this.renderSide()
        this.initPagination()
        this.loadOrderList()
    },
    renderSide:function(){
        _side.render('order-list')
    },
    initPagination:function(){
        var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.ordersListPrarms.page = page
            _this.loadOrderList()
        })
        //初始化分页组件
        this.$pagination.pagination()
    },
    loadOrderList:function(){
        var _this = this
        api.getOrdersList({
            data:this.ordersListPrarms,
            success:function(result){
                if(result.list.length > 0){
                    result.list.forEach(function(order){
                        order.createdTime = new Date(order.createdAt).toLocaleString()
                    })
                    var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.order-box').html(html)
                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
                }else{
                    $('.order-box').html('<p class="empty-message">您还没有订单!</p>')
                }
            }
        })
    },
}



$(function() {
    page.init()
})