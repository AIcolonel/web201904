import { combineReducers } from 'redux';
import { reducer as todolistReducer } from '../pages/todolist/store/index.js';

export default combineReducers({
  	todolist:todolistReducer
})