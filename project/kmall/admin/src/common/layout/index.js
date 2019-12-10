/*
* @Author: Chen
* @Date:   2019-12-04 16:23:08
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 09:31:38
*/
import React,{Component} from 'react'
import { Layout, Breadcrumb } from 'antd';

const {  Content } = Layout;

import Header from '../header/index.js'
import Sider from '../sider/index.js'

class AdminLayout extends Component{
	render(){
		return (
		<div className='AdminLayout'>
			<Layout>
				<Header />
				<Layout>
				  <Sider />
				  <Layout style={{ padding: '0 24px 24px' }}>
				    <Content
				      style={{
				        background: '#fff',
				        padding: 24,
				        margin: 0,
				        minHeight: 280,
				      }}
				    >
				      {this.props.children}
				    </Content>
				  </Layout>
				</Layout>
			</Layout>
		</div>
		)
	}
}

export default AdminLayout