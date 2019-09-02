import * as types from './actionTypes.js';
import { request } from 'util/index.js';
import { GET_PAGES } from 'api/index.js';


const getRequestAction = ()=>{
	return {
		type:types.DATA_LOADING
	}
}
const getRequestDoneAction = ()=>{
	return {
		type:types.DATA_DONE
	}
}

export const setPageAction = (data)=>{
	return {
		type:types.SET_PAGES,
		payload:data
	}
}

export const getPageAction = (page)=>{
	return (dispatch)=>{
		//请求数据前显示loading图标
		dispatch(getRequestAction());
		request({
			url:GET_PAGES,
			data:{
				page:page
			}
		})
		.then(result=>{
			//获取到后台数据库中用户所有信息,接下来就是改变store中数据
			// console.log(result)
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getRequestDoneAction());
		})
	}
}