/*
* @Author: TomChen
* @Date:   2019-08-12 10:11:52
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-12 17:46:49
*/
import { createStore,applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducer.js'

const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({

    })
    middlewares.push(logger)
}

//创建store
const store = createStore(reducer,applyMiddleware(...middlewares))
// const store = createStore(reducer)

export default store