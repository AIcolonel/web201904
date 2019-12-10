/*
* @Author: Chen
* @Date:   2019-12-04 16:23:08
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 09:55:04
*/
import React,{Component} from 'react'
import { Layout, Menu, Icon } from 'antd';
import {NavLink} from "react-router-dom";
import './index.css'

const {  Sider } = Layout;

class AdminSider extends Component{
	render(){
		return (
		<div className='AdminSider'>
			<Sider width={200} style={{ background: '#fff' }}>
			    <Menu
			      style={{ minHeight: '780px', borderRight: 0 }}
			    >
			        <Menu.Item key="1">
			        	<NavLink exact to='/'><Icon type="home" />首页</NavLink>
			        </Menu.Item>
			        <Menu.Item key="2">
			        	<NavLink to='/user'><Icon type="user" />用户管理</NavLink>
			        </Menu.Item>
			        <Menu.Item key="3">
			        	<NavLink to='/category'><Icon type="menu" />分类管理</NavLink>
			        </Menu.Item>
			    </Menu>
			</Sider>
		</div>
		)
	}
}

export default AdminSider