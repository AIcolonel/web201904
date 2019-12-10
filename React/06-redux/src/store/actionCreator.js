/*
* @Author: Chen
* @Date:   2019-11-28 10:32:00
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 09:37:29
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

//获取后台数据action
export const getLoadInitAction = (payload)=>({
	type:LOAD_DATA,
	payload
})

/*
错误设想
export const getLoadInitAction = (payload)=>{
	axios.get('http://127.0.0.1:3000')
	.then(result=>{
		return {
			type:LOAD_DATA,
			payload:result.data
		}
	})
	.catch(err=>{
		console.log(err)
	})
}
*/
