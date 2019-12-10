/*
* @Author: Chen
* @Date:   2019-12-04 16:23:08
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 20:20:45
*/
import React,{Component} from 'react'
import { Layout, Menu, Icon, Dropdown } from 'antd';
import './index.css'
import {getUsername,removeUsername} from 'util'
import axios from 'axios'
import api from 'api'

const { Header } = Layout;

class AdminHeader extends Component{
	constructor(props){
		super(props)
		this.handleLogout = this.handleLogout.bind(this)
	}
	handleLogout(){
		//发送请求清除后台sessions
		api.logout()
		.then(result=>{
			if(result.data.code == 0){
				//退出成功
				//1.清除前台localStorage
				removeUsername()
				//2.返回登录页
				window.location.href = '/'
			}
		})
		.catch(err=>{
			console.log(err)
		})
		/*
		axios({
			method: 'delete',
			url:'http://127.0.0.1:3000/sessions/users'
		})
		.then(result=>{
			if(result.data.code == 0){
				//退出成功
				//1.清除前台localStorage
				removeUsername()
				//2.返回登录页
				window.location.href = '/'
			}
		})
		.catch(err=>{
			console.log(err)
		})
		*/

	}
	render(){
		const menu = (
		  <Menu>
		    <Menu.Item key="0" onClick={this.handleLogout}>
		      <Icon type="logout" />退出
		    </Menu.Item>
		  </Menu>
		)
		return (
		<div className='AdminHeader'>
			<Header className="header">
				<div className="logo">
					Kmall 后台管理系统
				</div>
				<Dropdown overlay={menu} trigger={['click']} className='drop-down'>
				    <a className="ant-dropdown-link" href="#">
				      {getUsername()}<Icon type="down" />
				    </a>
				</Dropdown>
			</Header>
		</div>
		)
	}
}

export default AdminHeader