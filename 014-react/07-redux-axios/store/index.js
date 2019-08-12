//初始化一个store
import { createStore,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer.js'

const middleware = [thunk];
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
//传入一个reducer函数,专门用来处理并生成新的数据state
const store = new createStore(reducer,applyMiddleware(...middleware));

export default store;