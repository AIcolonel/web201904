import * as types from './actionTypes.js';
import { fromJS } from'immutable';


const defaultState = fromJS({
	usernum:0,
	productnum:0,
	ordernum:0
})

export default ((state=defaultState,action)=>{
	
	return state;
})