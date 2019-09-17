/*
* @Author: TomChen
* @Date:   2019-08-12 10:29:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-16 09:46:53
*/

import * as types  from './actionTypes.js'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    usernum:0,
    ordernum:0,
    productnum:0   
})

export default (state=defaultState,action)=>{
    if(action.type == types.SET_COUNT){
        return state.merge({
            usernum:action.payload.usernum,
            ordernum:action.payload.ordernum,
            productnum:action.payload.productnum,  
        })
    }
    return state
}