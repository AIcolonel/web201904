/*
* @Author: TomChen
* @Date:   2019-08-25 11:48:02
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-25 16:56:33
*/
var _util = require('util')
require('./index.css')
var tpl = require('./index.tpl')

;(function($){
    function Pagination($elem){
        this.$elem = $elem
        this.bindEvent()
    }
    Pagination.prototype = {
        constructor:Pagination,
        bindEvent:function(){
            var _this = this
            this.$elem.on('click','.page-item',function(){
                var $this = $(this)
                if($this.hasClass('disabled') || $this.hasClass('active')){
                    return
                }
                _this.$elem.trigger('page-change',$this.data('value'))
            })
        },
        render:function(options){
            //console.log(options)
            //1.计算总页数
            var pages = Math.ceil(options.total / options.pageSize)
            if(pages <= 1){
                return
            }
            //2.计算分页数据
            
            // 上一页 1 2 3 *4* 5 6 7 下一页
            // 上一页 2 3 4 *5* 6 7 8 下一页
            // 上一页 5 6 7 *8* 9 10 11 下一页
            
            var pageArray = []
            var start = options.current - options.range > 1 ? options.current - options.range : 1
            var end = options.current + options.range < pages ? options.current + options.range : pages
            var prve = options.current - 1
            var next = options.current + 1

            pageArray.push({
                name:'上一页',
                value:prve,
                disabled:prve > 0 ? false : true
            })

            for(var i = start;i<=end;i++){
                pageArray.push({
                    name:i,
                    value:i,
                    active:options.current == i
                })
            }

            pageArray.push({
                name:'下一页',
                value:next,
                disabled:next <= pages ? false : true
            })

            var html = _util.render(tpl,{
                pageArray:pageArray,
                current:options.current,
                pages:pages
            })
            this.$elem.html(html)

        }
    }

    Pagination.DEFAULT = {
        range:3
    }
    $.fn.extend({
        pagination:function(fn,options){
            //console.log(this) this是一个jquery对象
            return this.each(function(){
                // console.log(this) this是一个dom节点
                var $this = $(this)
                var pagination = $this.data('pagination')
                if(!pagination){
                    pagination = new Pagination($this)
                    $this.data('pagination',pagination)
                }
                if(typeof pagination[fn] == 'function'){
                    pagination[fn]($.extend({},Pagination.DEFAULT,options))
                }
            })
        }
    })
})($)