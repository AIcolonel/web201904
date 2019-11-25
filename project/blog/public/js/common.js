/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-21 16:28:43
*/
;(function($){
	//1.登录注册面板切换
	var $register = $('#register')
	var $login = $('#login')
	var $userInfo = $('#user-info')
	//1.1 登录=>注册
	$('#go-register').on('click',function(){
		$register.show()
		$login.hide()
	})
	//1.2 注册=>登录
	$('#go-login').on('click',function(){
		$register.hide()
		$login.show()
	})



	//2.点击注册发送请求
	$('#sub-register').on('click',function(){
		//2.1获取表单数据
		var username = $register.find("[name='username']").val()
		var password = $register.find("[name='password']").val()
		var repassword = $register.find("[name='repassword']").val()
		var $err = $register.find('.err')
		//2.2验证数据合法性
		//用户名已字母开头的包含数字和下划线的3-10位字符
		var userReg = /^[a-z][a-z0-9_]{2,9}$/i
		//密码是任意3-6位字符 
		var passwordReg = /^\w{3,6}$/
		var errMsg = ''
		//用户名验证
		if(!userReg.test(username)){
			errMsg = '用户名以字母开头的包含数字和下划线的3-10位字符'
		}
		//密码验证
		else if(!passwordReg.test(password)){
			errMsg = '密码是任意3-6位字符'
		}
		//确认密码
		else if(password != repassword){
			errMsg = '两次密码输入不一致'
		}
		//验证通过
		else{
			errMsg = ''
		}

		if(errMsg){
			$err.html(errMsg)
		}else{
			$err.html('')
			//2.3验证通过发送ajax请求
			$.ajax({
				url:'/user/register',
				type:'POST',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				// console.log(result)
				if(result.code == 0){//注册成功
					//返回登录面板
					$('#go-login').trigger('click')
				}else{//注册失败
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
	})

	//3.点击登录发送请求
	$('#sub-login').on('click',function(){
		//3.1获取表单数据
		var username = $login.find("[name='username']").val()
		var password = $login.find("[name='password']").val()
		var $err = $login.find('.err')
		//3.2验证数据合法性
		//用户名已字母开头的包含数字和下划线的3-10位字符
		var userReg = /^[a-z][a-z0-9_]{2,9}$/i
		//密码是任意3-6位字符
		var passwordReg = /^\w{3,6}$/
		var errMsg = ''
		//用户名验证
		if(!userReg.test(username)){
			errMsg = '用户名以字母开头的包含数字和下划线的3-10位字符'
		}
		//密码验证
		else if(!passwordReg.test(password)){
			errMsg = '密码是任意3-6位字符'
		}
		//验证通过
		else{
			errMsg = ''
		}

		if(errMsg){
			$err.html(errMsg)
		}else{
			$err.html('')
			//3.3验证通过发送ajax请求
			$.ajax({
				url:'/user/login',
				type:'POST',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				// console.log(result)
				if(result.code == 0){//登录成功
					//显示用户信息面板,更新用户信息
					/*
					$userInfo.find('span').html(result.user.username)
					$userInfo.show()
					$login.hide()
					*/

					window.location.reload()
				}else{//登录失败
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
	})
	/*逻辑抽离到logout.js文件中
	//4.点击退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(result){
			window.location.href = '/'
		})
		.fail(function(err){
			$('#user-info .err').html('请求失败,请稍后再试')
		})
	})
	*/



	//5.处理首页文章分页数据
	function buildAtricleHtml(articles){
		let html = ''
			articles.forEach(function(article){
				var createdTime = moment(article.createdAt).format('YYYY - MM - DD HH:mm:ss')
				html+= `
					<div class="panel panel-default content-item">
				      <div class="panel-heading">
				        <h3 class="panel-title">
				          <a href="${'/detail/'+article._id.toString()}" class="link" target="_blank">${article.title}</a>
				        </h3>
				      </div>
				      <div class="panel-body">
				        ${article.intro}
				      </div>
				      <div class="panel-footer">
				        <span class="glyphicon glyphicon-user"></span>
				        <span class="panel-footer-text text-muted">${article.user.username}</span>
				        <span class="glyphicon glyphicon-th-list"></span>
				        <span class="panel-footer-text text-muted">${article.category.name}</span>
				        <span class="glyphicon glyphicon-time"></span>
				        <span class="panel-footer-text text-muted">${createdTime}</span>
				        <span class="glyphicon glyphicon-eye-open"></span>
				        <span class="panel-footer-text text-muted"><em>${article.click}</em>已阅读</span>
				      </div>
				    </div>
				`
			})
		return html
	}
	function buildPaginationHtml(page,pages,list){
		var html = ''
		if(page == 1){
			html += '<li class="disabled">'
		}else{
			html += '<li>'
		}
		html += `	<a href="javascript:;" aria-label="Previous">
			          <span aria-hidden="true">&laquo;</span>
			        </a>
			      </li>`
      	list.forEach(function(i){
      		if(i == page){
      			html += '<li class="active">'
      		}else{
      			html += '<li>'
      		}
      		html += '<a href="javascript:;">'+i+'</a></li>'
      	})
        if(page == pages){
        	html += '<li class="disabled">'
        }else{
        	html += '<li>'
        }
        html += `	<a href="javascript:;" aria-label="Next">
			          <span aria-hidden="true">&raquo;</span>
			        </a>
			      </li>`
      return html 
	}
	var $articlesPage = $('#articles-page')
	$articlesPage.on('get-data',function(ev,data){
		//根据数据重新渲染文章列表部分结构
		//因此需要在文章列表部分外层再包装一个容器article-wrap
		//构建文章列表结构
		$('#article-wrap').html(buildAtricleHtml(data.docs))
		/*-----分节-----*/
		//构建分页器结构
		var $pagination = $articlesPage.find('.pagination')
		if(data.pages > 1){
			$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
		}else{
			$pagination.html('')
		}
	})
	$('#articles-page').pagination({
		url:"/articles"
	})

	//6.处理评论分页数据
	var $commentPage = $('#comment-page')
	function buildCommentHtml(comments){
		var html = ''
		comments.forEach(function(comment){
			var createdTime = moment(comment.createdAt).format('YYYY - MM - DD HH:mm:ss')
			html += `<div class="panel panel-default">
		          <div class="panel-heading">
		            <h3 class="panel-title">${ comment.user.username } 发表于 ${ createdTime }</h3>
		          </div>
		          <div class="panel-body">
		            ${ comment.content }
		          </div>
		        </div>`
		})


		return html 
	}
	$commentPage.on('get-data',function(ev,data){
		// console.log(data)
		//根据数据重新渲染评论部分结构
		//因此需要在文章列表部分外层再包装一个容器comment-wrap
		//构建文章列表结构
		$('#comment-wrap').html(buildCommentHtml(data.docs))
		//构建分页器结构
		var $pagination = $commentPage.find('.pagination')
		if(data.pages > 1){
			$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
		}else{
			$pagination.html('')
		}
	})
	$commentPage.pagination({
		url:"/comment/list"
	})





})(jQuery);