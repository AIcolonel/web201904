const axios = require('axios');
import { CHANGE_ITEM,ADD_ITEM,DELETE_ITEM,LOAD_DATA } from '../store/actionTypes.js'


export const getAddActions = ()=>{
	return {
		type:ADD_ITEM
	}
}

export const getChangeActions = (val)=>{
	return {
		type:CHANGE_ITEM,
		payload:val
	}
}

export const getDeleteActions = (index)=>{
	return {
		type:DELETE_ITEM,
		payload:index
	}
}

export const getDataActions = (data)=>{
	return {
		type:LOAD_DATA,
		payload:data
	}
}

export const getInitDataActions = ()=>{
	return (dispatch)=>{
		//发送请求
		// Make a request for a user with a given ID
		axios.get('http://127.0.0.1:3000')
		.then(function (response) {
		    // 拿到数据,派发action
		    console.log(response.data);
		    const action = getDataActions(response.data);
			dispatch(action);
		})
		.catch(function (error) {
		    // handle error
		    console.log(error);
		})
		.finally(function () {
		    // always executed
		});
	}
}