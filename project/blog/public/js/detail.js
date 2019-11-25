/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-20 15:53:40
*/
;(function($){
	$('#btn-comment').on('click',function(){
		var val = $('#comment-content').val().trim()
		var $err = $('.err')
		if(!val){
			$err.html('请输入评论内容!!!')
			return 
		}
		else if(val.length > 100){
			$err.html('评论内容不超过100个字符')
			return 
		}
		else{
			$err.html('')
		}
		//验证成功,发送ajax
		//评论需要获取评论文章的ID
		var id = $(this).data('id')
		$.ajax({
			url:'/comment/add',
			type:'post',
			dataType:'json',
			data:{
				content:val,
				article:id
			}
		})
		.done(function(result){
			// console.log(result)
			if(result.code == 0){
				$('#comment-content').val('')
				//构建评论列表分页结构,触发事件
				$('#comment-page').trigger('get-data',result.data)
			}else{
				$err.html(result.message)
			}
		})
		.fail(function(err){
			$err.html('评论失败,请稍后再试!!!')
		})
	})
})(jQuery);