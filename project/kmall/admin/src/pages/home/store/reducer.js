/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 10:28:47
*/
import * as actionTypes from './actionTypes.js'
import {fromJS} from 'immutable'

const defaultState = fromJS({
	isFetching:false,
	usernum:0,
    ordernum:0,
    productnum:0
})
export default (state=defaultState,action)=>{
	if(action.type == actionTypes.SET_COUNT){
		return state.merge({
			usernum:action.payload.usernum,
    		ordernum:action.payload.ordernum,
   		 	productnum:action.payload.productnum
		})
	}

	return state
}