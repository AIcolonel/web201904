import * as types from './actionTypes.js';
import { fromJS } from'immutable';

const defaultState = fromJS({
	list:[{
		    _id: '1',
		    username: 'admin',
		    isAdmin: true,
		    email: 'test@kuazhu.com',
		    phone:13456899874,
		    createAt:'2019-08-19 12:00:00'
		},
		{
		    _id: '2',
		    username: 'tom',
		    isAdmin: false,
		    email: 'test@kuazhu1.com',
		    phone:13456899874,
		    createAt:'2019-08-19 12:00:00'
		}
	],
	current:1,
	pageSize:0,
	total:0,
	isLoading:false
})

export default ((state=defaultState,action)=>{
	if(action.type == types.SET_PAGES){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total
		})
	}
	if(action.type == types.DATA_LOADING){
		return state.set('isLoading',true);
	}
	if(action.type == types.DATA_DONE){
		return state.set('isLoading',false);
	}
	return state;
})