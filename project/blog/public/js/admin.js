/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-14 11:07:38
*/
;(function($){
	$('.del').on('click',function(){
		if(!window.confirm('请确定是否要删除???')){
			return false
		}
	})
})(jQuery);