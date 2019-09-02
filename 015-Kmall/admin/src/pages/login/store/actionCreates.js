import { message } from 'antd';
import * as types from './actionTypes.js';
import { request,setUsername } from 'util/index.js';
import { ADMIN_LOGIN } from 'api/index.js';

const getLoginRequestAction = ()=>{
	return {
		type:types.LOGIN_REQUEST
	}
}
const getLoginRequestDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}
export const getLoginAction = (values)=>{
	return (dispatch)=>{
		//数据加载(登陆加载显示loading)
		dispatch(getLoginRequestAction())
    	//发送ajax请求
		request({
		  	method: 'post',
		  	url: ADMIN_LOGIN,
		  	data:{
		  		username:values.username,
		  		password:values.password,
		  		role:values.username
		  	}
		})
		.then(response=>{
			// console.log(response)
			if(response.code == 0){
				// console.log(response.user);
				//保存用户名到本地
				setUsername(response.data.username);
		    	//登陆成功跳转后台首页
		    	window.location.href = '/';
		    }else if(response.code == 1){
		    	message.error(response.message)
		    }
		})
		.catch((err)=>{
			console.log(err);
			message.error('网络错误,请稍后再试')
		})
		.finally(()=>{
			dispatch(getLoginRequestDoneAction())
		})
	}
}

