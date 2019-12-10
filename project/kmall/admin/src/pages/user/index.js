/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 09:34:28
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import { Breadcrumb,Table, Divider, Tag  } from 'antd'
import './index.css'
import moment from 'moment'

import Layout from 'common/layout'

class User extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
    render() {
    	const columns = [
		  {
		    title: '用户名',
		    dataIndex: 'username',
		    key: 'username',
		    render: text => <a>{text}</a>,
		  },
		  {
		    title: '是否是管理员',
		    dataIndex: 'isAdmin',
		    key: 'isAdmin',
		    render:(isAdmin)=>(isAdmin ? '是' : '否')
		  },
		  {
		    title: 'email',
		    dataIndex: 'email',
		    key: 'email',
		  },
		  {
		    title: '电话',
		    key: 'phone',
		    dataIndex: 'phone',
		  },
		  {
		    title: '创建时间',
		    key: 'createdAt',
		    dataIndex: 'createdAt',
		  },
		];

    	const {list,current,pageSize,total,handlePage,isFetching} = this.props
    	// console.log(list)
    	const data = list.map((user)=>{
    		return {
    			key:user.get('_id'),
    			username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				email:user.get('email'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    		}
    	}).toJS()
        return (
        <div className="User">
        	<Layout>
        		<Breadcrumb style={{ margin: '16px 0' }}>
			      <Breadcrumb.Item>首页</Breadcrumb.Item>
			      <Breadcrumb.Item>用户管理</Breadcrumb.Item>
			      <Breadcrumb.Item>用户列表</Breadcrumb.Item>
			    </Breadcrumb>
        		<div className='content'>
        			<Table 
        				columns={columns} 
        				dataSource={data} 
        				pagination={{
        					current:current,
        					pageSize:pageSize,
        					total:total
        				}}
        				onChange={(page)=>{
        					handlePage(page.current)
        				}}
        				loading={{
        					spinning:isFetching,
        					tip:'数据加载中...'
        				}}
        			/>
        		</div>
        	</Layout>
		</div>
        );
    }
}

//将属性映射到组件
const mapStateToProps = (state)=>{
	return {
		isFetching:state.get('user').get('isFetching'),
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreators.getPageAction(page))
		}		
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User)