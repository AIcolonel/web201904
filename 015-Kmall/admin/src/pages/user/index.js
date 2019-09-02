import React,{Component,Fragment} from 'react';
import './index.css';
import { Table, Divider, Tag,Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import {actionCreaters} from './store/index.js';
import AdminLayout from 'common/layout/index.js';
//引入时间格式模块
import  moment  from 'moment';

/*容器组件*/
class User extends Component{
	componentDidMount(){
		this.props.handlePage(1);
	}
	render(){
		const columns = [
		  {
		    title: '用户名',
		    dataIndex: 'username',
		    key: 'username'
		  },
		  {
		    title: '是否是管理员',
		    dataIndex: 'isAdmin',
		    key: 'isAdmin',
		    render: isAdmin => (isAdmin ? <a>{'是'}</a> : <a>{'否'}</a>)
		  },
		  {
		    title: '邮箱',
		    dataIndex: 'email',
		    key: 'email',
		  },
		  {
		    title: '电话',
		    key: 'phone',
		    dataIndex: 'phone'
		  },
		  {
		    title: '注册时间',
		    dataIndex: 'createAt',
		    key: 'createAt',
		  },
		];
		/*
		const data = [
		  {
		    key: '1',
		    username: 'admin',
		    isAdmin: true,
		    email: 'test@kuazhu.com',
		    phone:13456899874,
		    createAt:'2019-08-19 12:00:00'
		  }
		];
		*/
		const { list,current,pageSize,total,handlePage,isLoading } = this.props;
		
		//对数据进行处理
		const data = list.map(user=>{
			return {
				key: user.get('_id'),
		    	username: user.get('username'),
		    	isAdmin: user.get('isAdmin'),
		    	email: user.get('email') || '保密',
		    	phone:user.get('phone') || '保密',
		    	createAt:moment(user.get('createAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS();
		return (
			<div className="User">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>首页</Breadcrumb.Item>
			          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
			          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
			        </Breadcrumb>
					<Table 
					columns={columns} 
					dataSource={data} 
					pagination={{
						current:current,
						pageSize:pageSize,
						total:total
					}}
					loading={{
						spinning:isLoading,
						tip:'数据加载中'
					}}
					onChange={(page)=>{
						// console.log(page)
						handlePage(page.current)
					}} 
					/>
				</AdminLayout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		isLoading:state.get('user').get('isLoading')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			const action = actionCreaters.getPageAction(page);
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User)
