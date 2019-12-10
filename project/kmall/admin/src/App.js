/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 09:53:48
*/
import React,{Component,Fragment} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {getUsername} from 'util/index.js'
import api from 'api'

import Login from 'pages/login/index.js'
import Home from 'pages/home/index.js'
import User from 'pages/user/index.js'
import Category from 'pages/category/index.js'
import Err from 'common/err/index.js'


class App extends Component{
	render(){
		// console.log(api.login({id:123}))
		const HomeRoute = ({component:Component,...rest})=>{
			return (
				<Route 
					{...rest}
					render={(props)=>{
						return getUsername() ? <Component /> : <Redirect to='/login' />
					}}
				/>
			)
		}
		const LoginRoute = ({component:Component,...rest})=>{
			return (
				<Route 
					{...rest}
					render={(props)=>{
						return getUsername() ? <Redirect to='/' /> : <Component />
					}}
				/>
			)
		}
		return (
			<Router>
				<div className="App">
					<Switch>
						<HomeRoute exact path="/" component={Home} />
						<HomeRoute path="/user" component={User} />
						<HomeRoute path="/category" component={Category} />
						<LoginRoute path="/login" component={Login} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App