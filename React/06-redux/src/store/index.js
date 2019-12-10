/*
* @Author: Chen
* @Date:   2019-11-27 16:01:40
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-27 16:36:17
*/
import { createStore } from 'redux'
import reducer from './reducer.js'

const store = createStore(reducer)

export default store