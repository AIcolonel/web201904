//这个reducer是login自己的reducer
//需要把这个reducer合并到整个应用的reducer中'./src/store/reducer'

import * as types from './actionTypes.js';
import { fromJS } from'immutable';

//引入immutable数据格式
const defaultState = fromJS({
	isFething:false
})

export default ((state=defaultState,action)=>{
	if(action.type == types.LOGIN_REQUEST){
		return state.set('isFething',true)
	}
	if(action.type == types.LOGIN_DONE){
		return state.set('isFething',false)
	}
	return state;
})