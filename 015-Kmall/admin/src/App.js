import React,{Component,Fragment} from 'react';
import './index.css';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Redirect,
	Switch,
	Link } 
from "react-router-dom";
import Home from './pages/home/index.js';
import Login from './pages/login/index.js';
import User from './pages/user/index.js';
import Category from './pages/category/index.js';
import Product from './pages/product/index.js';
import Order from './pages/order/index.js';
import Err from './common/err/index.js';
import { getUsername } from 'util/index.js';

/*容器组件*/

class App extends Component{
	render(){
		//自定义路由
		//当本地有用户信息则跳转后台首页,没有用户信息则跳转登录页面
		const ProtectRouter = ({component:Component,...rest})=>(
			<Route
				{...rest}
				render = {(props)=>{
					return getUsername()
					? <Component {...props} />
					: <Redirect to="/login" />
				}}
			/>
		)
		const LoginRouter = ({component:Component,...rest})=>{
			return getUsername()
			? <Redirect to="/" />
			: <Component {...rest} />
		}
		return(
			<Router>
				<div className="App">
					<Switch>
						{
						//Switch只要匹配到该路由则不会继续向下匹配
						//Redirect重定向跳转页面,to跳转到指定页面
						}
						<ProtectRouter exact path="/" component={Home}/>
	    				<LoginRouter path="/login" component={Login}/>
	    				<ProtectRouter path="/user" component={User}/>
	    				<ProtectRouter path="/category" component={Category}/>
	    				<ProtectRouter path="/product" component={Product}/>
	    				<ProtectRouter path="/order" component={Order}/>
	    				<Route component={Err} />
	    			</Switch>
    			</div>
			</Router>
		)
	}
}



export default App;