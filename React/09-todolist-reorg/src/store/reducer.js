/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-02 10:06:25
*/
import { combineReducers } from 'redux'
import {reducer as todoListReducer} from '../pages/todolist/store'

export default combineReducers({
	todolist:todoListReducer
})