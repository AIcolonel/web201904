/*
* @Author: Chen
* @Date:   2019-11-27 16:35:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 15:18:38
*/
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import {reducer as loginReducer} from 'pages/login/store'
import {reducer as homeReducer} from 'pages/home/store'
import {reducer as userReducer} from 'pages/user/store'
import {reducer as categoryReducer} from 'pages/category/store'
import {reducer as productReducer} from 'pages/product/store'
import {reducer as adReducer} from 'pages/ad/store'
import {reducer as orderReducer} from 'pages/order/store'

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
	product:productReducer,
	ad:adReducer,
	order:orderReducer,
})