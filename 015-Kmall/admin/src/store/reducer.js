//这个reducer是整个应用总的reducer,每一个子组件中的reducer都需要在
//这个reducer中进行合并


import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from '../pages/login/store/index.js';
import { reducer as homeReducer } from '../pages/home/store/index.js';
import { reducer as userReducer } from '../pages/user/store/index.js';
import { reducer as categoryReducer } from '../pages/category/store/index.js';
//combineReducers是合并reducer
export default combineReducers({
  	login:loginReducer,
  	home:homeReducer,
  	user:userReducer,
  	category:categoryReducer,
})