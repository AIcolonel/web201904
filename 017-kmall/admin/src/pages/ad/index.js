/*
* @Author: Tom
* @Date:   2019-04-17 16:11:21
* @Last Modified by:   Tom
* @Last Modified time: 2019-08-22 21:50:25
*/
import React, { Component } from 'react'
import { Switch,Route } from 'react-router-dom';
import AdList from './list.js'
import AdSave from './save.js'

class Ad extends Component {
	render(){
		return(
			<Switch>
				<Route path="/ad/save/:adId?" component={AdSave} />
				<Route path="/ad/" component={AdList} />
			</Switch>
		)
	}
}

export default Ad