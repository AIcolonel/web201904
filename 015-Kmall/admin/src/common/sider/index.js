import React,{Component,Fragment} from 'react';
import './index.css';
import {  Layout , Menu ,Icon  } from 'antd';
import { 
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
	NavLink } 
from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;


/*容器组件*/
class AdminSider extends Component{
	render(){
		return (
			<div className="AdminSider">
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
			          mode="inline"
			          style={{ minHeight: 660, borderRight: 0 }}
			        >
			            <Menu.Item key="1">
			            	<NavLink exact to="/"><Icon type="home" />首页</NavLink>
			            </Menu.Item>
			            <Menu.Item key="2">
			            	<NavLink to="/user"><Icon type="team" />用户列表</NavLink>
			            </Menu.Item>
			            <Menu.Item key="3">
			            	<NavLink to="/category"><Icon type="menu-unfold" />分类列表</NavLink>
			            </Menu.Item>
			            <Menu.Item key="4">
			            	<NavLink to="/product"><Icon type="ordered-list" />商品列表</NavLink>
			            </Menu.Item>
			            <Menu.Item key="5">
			            	<NavLink to="/order"><Icon type="alipay" />订单管理</NavLink>
			            </Menu.Item>
		            </Menu>
			    </Sider>
			</div>
		)
	}
}

export default AdminSider;