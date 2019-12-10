/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 16:56:41
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import {
  Link,
} from "react-router-dom";
import { Breadcrumb,Table, Divider, Tag ,Button } from 'antd'
import './index.css'
import moment from 'moment'

import Layout from 'common/layout'

class CategoryList extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handlePage(1)
	}
    render() {
    	const columns = [
		  {
		    title: '分类名称',
		    dataIndex: 'name',
		    key: 'name',
		    render: text => <a>{text}</a>,
		  },
		  {
		    title: '手机分类',
		    dataIndex: 'mobileName',
		    key: 'mobileName',
		  },
		  {
		    title: '是否显示',
		    dataIndex: 'isShow',
		    key: 'isShow',
		  },
		  {
		    title: '排序',
		    key: 'order',
		    dataIndex: 'order',
		  },
		];

    	const dataSource = []
        return (
        <div className="CategoryList">
        	<Layout>
        		<Breadcrumb style={{ margin: '16px 0' }}>
			      <Breadcrumb.Item>首页</Breadcrumb.Item>
			      <Breadcrumb.Item>分类管理</Breadcrumb.Item>
			      <Breadcrumb.Item>分类列表</Breadcrumb.Item>
			    </Breadcrumb>
			    <div className='btn'>
			    	<Link to='/category/add'>
			    		<Button type="primary" className='btn-add'>添加分类</Button>
			    	</Link>
        		</div>
        		<div className='content'>
        			<Table 
        				columns={columns} 
        				dataSource={dataSource} 
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

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)