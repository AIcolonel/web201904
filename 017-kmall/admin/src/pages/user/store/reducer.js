/*
* @Author: TomChen
* @Date:   2019-08-12 10:29:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-16 17:17:36
*/

import * as types  from './actionTypes.js'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    isFetching:false,
    list:[],
    current:1,
    total:0,
    pageSize:0    
})

export default (state=defaultState,action)=>{
    if( action.type == types.SET_PAGE){
        return state.merge({
            list:fromJS(action.payload.list),
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize            
        })
    }
    if(action.type == types.PAGE_REQEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.PAGE_REQEST_DONE){
        return state.set('isFetching',false)
    }     
    return state
}