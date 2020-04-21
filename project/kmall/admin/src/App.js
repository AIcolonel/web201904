/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 15:17:15
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
import Product from 'pages/product/index.js'
import Order from 'pages/order/index.js'
import Ad from 'pages/ad/index.js'
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
			<Router forceRefresh={true}>
				<div className="App">
					<Switch>
						<HomeRoute exact path="/" component={Home} />
						<HomeRoute path="/user" component={User} />
						<HomeRoute path="/category" component={Category} />
						<HomeRoute path="/product" component={Product} />
						<HomeRoute path="/order" component={Order} />
						<HomeRoute path="/ad" component={Ad} />
						<LoginRoute path="/login" component={Login} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App