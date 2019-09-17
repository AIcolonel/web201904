/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-25 16:58:38
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.css')

var page = {
    productsListPrarms:{
        category:_util.getParamFromUrl('categoryId'),
        keyword:_util.getParamFromUrl('keyword'),
        page:_util.getParamFromUrl('page') || 1,
        orderBy:_util.getParamFromUrl('orderBy') || 'default',
    },    
    init:function(){
        this.initPagination()
        this.bindEvent()
        this.loadProductList()
    },
    initPagination:function(){
        var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.productsListPrarms.page = page
            _this.loadProductList()
        })
        //初始化分页组件
        this.$pagination.pagination()
    },
    bindEvent:function(){
        var _this = this
        //处理排序
        //根据点击的排序按钮来决定排序参数,根据新的排序参数获取数据再重新渲染页面
        $('.sort-item').on('click',function(){
            var $this = $(this)
            //点击默认排序
            if($this.hasClass('default')){
                if($this.hasClass('active')){
                    return
                }
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active')

                _this.productsListPrarms.orderBy = 'default'
            }
            //点击按价格排序
            else if($this.hasClass('price')){
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active')
                
                if($this.hasClass('asc')){
                    $this.removeClass('asc')
                    .addClass('desc')
                    _this.productsListPrarms.orderBy = 'price_desc'
                }else if($this.hasClass('desc')){
                    $this.removeClass('desc')
                    .addClass('asc')
                    _this.productsListPrarms.orderBy = 'price_asc'                    
                }                
            }
            _this.productsListPrarms.page = 1
            _this.loadProductList()            
        })
    },
    loadProductList:function(){
        var _this = this
        api.getProductsList({
            data:this.productsListPrarms,
            success:function(result){
                if(result.list.length > 0){
                    var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.product-list-box').html(html)
                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
                }else{
                    $('.product-list-box').html('<p class="empty-message">您找的商品去火星了!</p>')
                }
            }
        })
    },
}



$(function() {
    page.init()
})