/*
* @Author: Chen
* @Date:   2019-10-29 11:24:39
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-30 10:21:43
*/
;(function($){
	var $input = $('.todo-input')
	$input.on('keydown',(ev)=>{
		// console.log(ev.keyCode)
		//按下回车键
		if(ev.keyCode == 13){
			//发送ajax请求将输入框数据存到后台
			$.ajax({
				url:'/add',
				type:'post',
				dataType:'json',
				data:{
					task:$input.val()
				},
				success:(data)=>{
					//根据返回数据判断是否添加成功
					//成功则将数据插入到列表中
					//失败打印失败结果
					console.log(data)
				}
			})
		}

	})
})(jQuery)