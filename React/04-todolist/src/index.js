/*
* @Author: Chen
* @Date:   2019-11-22 16:03:40
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-27 10:07:01
*/
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

//虚拟DOM测试时间
/*
function tick(){
	const timer = (
		<div>
			<h1>hello</h1>
			<p>{new Date().toLocaleString()}</p>
		</div>
	)
	ReactDOM.render(
	  timer,
	  document.getElementById('root')
	)
}
setInterval(tick,1000)
*/
