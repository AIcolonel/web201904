/*
* @Author: Chen
* @Date:   2019-11-27 16:01:40
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 10:12:42
*/
import { createStore,applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer.js'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  // ...options
})
const middlewares = [thunk]
if (process.env.NODE_ENV === `development`) {
 	middlewares.push(logger)
}

const store = createStore(reducer,applyMiddleware(...middlewares))

export default store