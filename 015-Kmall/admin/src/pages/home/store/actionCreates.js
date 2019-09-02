const axios = require('axios');
import * as types from './actionTypes.js';
import { message } from 'antd';

import { request,setUsername } from 'util/index.js';
import { ADMIN_COUNT } from 'api/index.js';

const setCountAction = (payload)=>({
	type:types.SET_COUNT,
	payload
})

export const getCountAction = ()=>{
	return (dispatch)=>{
		request({
		  	method: 'get',
		  	url: ADMIN_COUNT,
		})
		.then(response=>{
			//获取到后台数据并更新后台数据
			if(response.code == 0){
				dispatch(setCountAction(response.data))
			}
		})
		.catch((err)=>{
			console.log(err);
			message.error('网络错误,请稍后再试')
		})
		
	}
}