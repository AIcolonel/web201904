/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 09:54:45
*/
import {
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'
import axios from 'axios'

export const getChangeItemAction = (val) =>({
	type:CHANGE_ITEM,
	payload:val
})

export const getAddItemAction = () =>({
	type:ADD_ITEM
})

export const getDelItemAction = (index) =>({
	type:DEL_ITEM,
	payload:index
})




//获取后台数据action(利用redux-thunk)
const getLoadInitAction = (payload)=>({
	type:LOAD_DATA,
	payload
})
export const getRequestInitDataAction = ()=>{
	return (dispatch,getState)=>{
		axios.get('http://127.0.0.1:3000')
		.then(result=>{
			//派发action
			dispatch(getLoadInitAction(result.data))
		})
		.catch(err=>{
			console.log(err)
		})
	}
	
}
