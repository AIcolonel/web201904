/*
* @Author: TomChen
* @Date:   2019-08-12 10:29:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-15 15:13:26
*/

import * as types  from './actionTypes.js'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    isFetching:false
})

export default (state=defaultState,action)=>{
    if(action.type == types.LOGIN_REQEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.LOGIN_REQEST_DONE){
        return state.set('isFetching',false)
    }    
    return state
}