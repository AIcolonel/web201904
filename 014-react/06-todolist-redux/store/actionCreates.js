import { CHANGE_ITEM,ADD_ITEM,DELETE_ITEM } from '../store/actionTypes.js'


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