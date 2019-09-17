/*
* @Author: TomChen
* @Date:   2019-08-09 10:53:03
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-14 09:13:25
*/
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from './store'

import App from './App.js'

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'))





