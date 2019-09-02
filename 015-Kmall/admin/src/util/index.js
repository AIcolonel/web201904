const axios = require('axios');

export const request = (options)=>{
	return new Promise((resolve,rejected)=>{
		const params = {
			method:options.method || 'get',
			url:options.url || '',
			//携带cookie信息
			withCredentials: true
		}
		//如果是get或者delete请求参数是params,别的请求则是data(axios固定写法)
		if(params.method.toUpperCase() == 'GET' || options.method.toUpperCase() == 'DELETE'){
			params.params = options.data || '';
		}else{
			params.data = options.data || '';
		}
		axios(params)
		.then(result=>{
			//为了保证后台和前端用户状态保持统一
			if(resolve.code == 10){//后台存储用户数据没有权限
				console.log('权限失效')
				//为了保持统一需要把前台用户存储的storage也给清除掉并且返回到登录界面
				removeUsername();
				window.location.href = '/login';
				rejected('没有权限');
			}else{//前后台用户状态一致
				resolve(result.data)
			}
		})
		.catch(err=>{
			rejected(err);
		})
	})
}

export const setUsername = (username)=>{
	window.localStorage.setItem('username',username);
}
export const getUsername = ()=>{
	return window.localStorage.getItem('username');
}
export const removeUsername = ()=>{
	return window.localStorage.removeItem('username');
}