import React,{Component,Fragment} from 'react';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


const {  Content } = Layout;

import AdminHeader from 'common/header/index.js';
import AdminSider from 'common/sider/index.js';

/*容器组件*/
class AdminLayout extends Component{
	render(){
		return (
			<Layout>
				<div className="AdminLayout">
				    <AdminHeader />
				    <Layout>
				      <AdminSider />
				      <Layout style={{ padding: '0 24px 24px' }}>
				        <Content
				          style={{
				            background: '#fff',
				            padding: 24,
				            margin: 0,
				            minHeight: 280,
				          }}
				        >
				          {
				          	//含义是让子组件中的内容填充
				          	this.props.children
				          }
				        </Content>
				      </Layout>
				    </Layout>
				</div>
			</Layout>
		)
	}
}

export default AdminLayout;