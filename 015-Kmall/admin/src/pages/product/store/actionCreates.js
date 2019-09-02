import { message } from 'antd';
import * as types from './actionTypes.js';
import { request } from 'util/index.js';
import { 
	ADD_CATEGORY,
	GET_LEVEL_CATEGORIES,
	GET_CATEGORY_PAGE,
	UPDATE_CATEGORY_NAME,
	UPDATE_CATEGORY_MOBILE_NAME,
	UPDATE_CATEGORY_ORDER,
	UPDATE_CATEGORY_SHOW,
} from 'api/index.js';

const getAddRequestAction = ()=>{
	return {
		type:types.ADD_CATEGORY
	}
}
const getAddRequestDoneAction = ()=>{
	return {
		type:types.ADD_CATEGORY_DONE
	}
}
export const getAddAction = (values)=>{
	return (dispatch)=>{
		//数据加载(登陆加载显示loading)
		dispatch(getAddRequestAction())
    	//发送ajax请求
		request({
		  	method: 'post',
		  	url: ADD_CATEGORY,
		  	data:values
		})
		.then(response=>{
			// console.log(response)
			if(response.code == 0){
				// console.log(response);
				message.success('添加分类成功')
				dispatch(setLevelCategoriesAction(response.data))
		    }else if(response.code == 1){
		    	message.error(response.message)
		    }
		})
		.catch((err)=>{
			console.log(err);
			message.error('网络错误,请稍后再试')
		})
		.finally(()=>{
			dispatch(getAddRequestDoneAction())
		})
	}
}
export const setLevelCategoriesAction = (payload)=>{
	return {
		type:types.SET_LEVEL_CATEGORIES,
		payload
	}
}
export const getLevelCategoriesAction = ()=>{
	return (dispatch)=>{
		request({
			url:GET_LEVEL_CATEGORIES,
			data:{
				level:3
			}
		})
		.then(result=>{
			//派发action设置分类数据
			// console.log(result);
			if(result.code == 0){
				dispatch(setLevelCategoriesAction(result.data))
			}
		})
		.catch((err)=>{
			console.log(err);
			message.error('网络错误,请稍后再试')
		})
	}
}

//获取并设置分类分页信息
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
			url:GET_CATEGORY_PAGE,
			data:{
				page:page
			}
		})
		.then(result=>{
			//获取到后台数据库中用户所有信息,接下来就是改变store中数据
			console.log(result)
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

//更新分类名称
export const getUpdateNameAction = (id,newName)=>{
	return (dispatch,getState)=>{
		//在发送请求过程中需要将当前显示的页码发送过去、
		//getState()获取的数据是整个store数据;
		//getState().get('category')获取的数据是整个category的store中的数据
		const page = getState().get('category').get('current')
		// console.log(page)
		request({
			url:UPDATE_CATEGORY_NAME,
			method:'put',
			data:{
				id:id,
				name:newName,
				page:page
			}
		})
		.then(result=>{
			//获取到后台数据库中用户所有信息,接下来就是改变store中数据
			if(result.code == 0){
				message.success('更新分类成功')
				dispatch(setPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('更新分类名称失败')
		})
	}
}
//更新手机分类名称
export const getUpdateMobileNameAction = (id,newMobileName)=>{
	return (dispatch,getState)=>{
		//在发送请求过程中需要将当前显示的页码发送过去、
		//getState()获取的数据是整个store数据;
		//getState().get('category')获取的数据是整个category的store中的数据
		const page = getState().get('category').get('current')
		// console.log(page)
		request({
			url:UPDATE_CATEGORY_MOBILE_NAME,
			method:'put',
			data:{
				id:id,
				mobileName:newMobileName,
				page:page
			}
		})
		.then(result=>{
			//获取到后台数据库中用户所有信息,接下来就是改变store中数据
			// console.log(result)
			if(result.code == 0){
				message.success('更新手机分类成功')
				dispatch(setPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('更新手机分类名称失败')
		})
	}
}
//更新排序
export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		//在发送请求过程中需要将当前显示的页码发送过去、
		//getState()获取的数据是整个store数据;
		//getState().get('category')获取的数据是整个category的store中的数据
		const page = getState().get('category').get('current')
		request({
			url:UPDATE_CATEGORY_ORDER,
			method:'put',
			data:{
				id:id,
				order:newOrder,
				page:page
			}
		})
		.then(result=>{
			//获取到后台数据库中用户所有信息,接下来就是改变store中数据
			if(result.code == 0){
				message.success('更新排序成功')
				dispatch(setPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('更新排序失败')
		})
	}
}
//更新显示隐藏商品
export const getUpdateShowAction = (id,show)=>{
	return (dispatch,getState)=>{
		//在发送请求过程中需要将当前显示的页码发送过去、
		//getState()获取的数据是整个store数据;
		//getState().get('category')获取的数据是整个category的store中的数据
		const page = getState().get('category').get('current')
		request({
			url:UPDATE_CATEGORY_SHOW,
			method:'put',
			data:{
				id:id,
				isShow:show,
				page:page
			}
		})
		.then(result=>{
			//获取到后台数据库中用户所有信息,接下来就是改变store中数据
			if(result.code == 0){
				message.success('更新显示成功')
				dispatch(setPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('更新显示失败')
		})
	}
}