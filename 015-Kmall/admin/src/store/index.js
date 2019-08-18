//初始化一个store,负责整个应用数据管理
import { createStore,applyMiddleware  } from 'redux';
//redux-thunk 是redux的一个中间件,是对action和store的中间的dispatch方法的升级,让dispatch方法可以处理一个函数,
//所以用了redux-thunk后action不仅可以是一个对象,也可以是一个函数
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