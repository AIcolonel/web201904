import { combineReducers } from 'redux-immutable';
import { reducer as todolistReducer } from '../pages/todolist/store/index.js';

export default combineReducers({
  	todolist:todolistReducer
})