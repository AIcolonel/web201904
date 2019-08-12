//初始化一个store
import { createStore } from 'redux'
import reducer from './reducer.js'

//传入一个reducer函数,专门用来处理并生成新的数据state
const store = new createStore(reducer);

export default store;