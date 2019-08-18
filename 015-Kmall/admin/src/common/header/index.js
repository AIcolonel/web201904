import React,{Component,Fragment} from 'react';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon ,Dropdown } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import { USER_LOGOUT } from 'api/index.js';
import { getUsername,request,removeUsername } from 'util/index.js';

/*容器组件*/
class AdminHeader extends Component{
	handleLogout(){
		//发送请求,清除用户信息
		request({
			method:'delete',
			url:USER_LOGOUT
		})
		.then(result=>{
			if(result.code == 0){
				//清除浏览器本地存储
				removeUsername();
				window.location.href = '/login'
			}
		})
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
			<Layout>
				<div className="AdminHeader">
				    <Header className="header">
				      <div className="logo">KMALL</div>
				      <Dropdown overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					      {getUsername()} <Icon type="down" />
					    </a>
					  </Dropdown>
				    </Header>
				</div>
			</Layout>
		)
	}
}

export default AdminHeader;