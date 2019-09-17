/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 15:16:35
*/
require('pages/common/logo')

require('pages/common/footer')
var _util = require('util')

require('./index.css')

$(function(){
    var type = _util.getParamFromUrl('type') || 'default'
    if(type == 'payment'){
        var orderNo = _util.getParamFromUrl('orderNo')
        var $btn = $('.order-detail')
        var url = $btn.attr('href')+orderNo
        $btn.attr('href',url)
    }
    $('.'+type).show()
})