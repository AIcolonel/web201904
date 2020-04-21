/*
* @Author: Chen
* @Date:   2019-12-16 11:20:13
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 15:32:58
*/
//引入common中逻辑
require('pages/common/logo')
require('pages/common/footer')

require('./index.css')
var _util = require('util')

$(function(){
	var type = _util.getParamsFromUrl('type') || 'default'
	//处理订单详情
	if(type == 'payment'){
		var orderNo = _util.getParamsFromUrl('orderNo')
		var $btn = $('.order-detail')
		var url = $btn.attr('href')+orderNo
		$btn.attr('href',url)
	}
	$('.'+type).show()

})
