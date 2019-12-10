/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-02 19:48:51
*/
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import {reducer as todoListReducer} from '../pages/todolist/store'

export default combineReducers({
	todolist:todoListReducer
})