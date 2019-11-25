/*
* @Author: Chen
* @Date:   2019-10-29 11:24:39
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-31 09:56:28
*/
;(function($){
	var $input = $('.todo-input')
	$input.on('keydown',(ev)=>{
		// console.log(ev.keyCode)
		//按下回车键
		if(ev.keyCode == 13){
			//发送ajax请求将输入框数据存到后台
			$.ajax({
				url:'/Item/add',
				type:'post',
				dataType:'json',
				data:{
					task:$input.val()
				},
				success:(result)=>{
					//根据返回数据判断是否添加成功
					const data = result.data
					if(result.code == 0){//成功则将数据生成dom插入到列表中
						let dom = $(`<li class="todo-item" data-id="${data.id}">${data.task}</li>`)
						// console.log(dom)
						$('.todo-list').append(dom)
						$input.val('')
					}else{//失败打印失败结果
						console.log(result.message)
					}
				}
			})
		}
	})

	//点击删除(由于任务是动态添加的因此需要用事件代理)
	$('.todo-list').on('click','.todo-item',function(){
		var $this = $(this)
		$.ajax({
			url:'/Item/delete/'+$this.data('id'),
			dataType:'json',
			success:function(result){
				// console.log(result)
				//根据返回的状态信息做出不同的处理
				if(result.code == 0){//成功
					$this.remove()
				}else{//失败
					alert(result.message)
				}
			}
		})
	})
})(jQuery)
