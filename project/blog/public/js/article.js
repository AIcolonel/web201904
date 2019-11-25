/*
* @Author: Chen
* @Date:   2019-11-15 10:01:05
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-15 10:35:17
*/
;(function($){
	ClassicEditor
    .create(document.querySelector( '#content' ),{
    	language:'zh-cn',
    	ckfinder:{
			uploadUrl:'/article/uploadImage'
		}
    })
    .catch( error => {
        console.log( error );
    })
})(jQuery)