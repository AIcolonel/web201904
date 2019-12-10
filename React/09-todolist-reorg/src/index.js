/*
* @Author: Chen
* @Date:   2019-11-22 16:03:40
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 10:45:47
*/
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'

import App from './App.js'

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)

