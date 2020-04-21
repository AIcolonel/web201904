/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 11:34:23
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import {
  Link,
} from "react-router-dom";
import { Breadcrumb,Table, Divider, Tag ,Button,Input,InputNumber,Switch  } from 'antd'
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
		    width:'40%',
		    render: (name,record)=>(<Input 
		    	style={{width:'60%'}}
		    	defaultValue={name}
		    	onBlur={(ev)=>{
		    		if(ev.target.value != name){
		    			// console.log(record)
		    			handleUpdateName(record._id,ev.target.value)
		    		}
		    	}}
		    />),
		  },
		  {
		    title: '手机分类',
		    dataIndex: 'mobileName',
		    key: 'mobileName',
		    width:'30%',
		    render: (mobileName,record)=>(<Input 
		    	style={{width:'60%'}}
		    	defaultValue={mobileName}
		    	onBlur={(ev)=>{
		    		if(ev.target.value != mobileName){
		    			// console.log(record)
		    			handleUpdateMobileName(record._id,ev.target.value)
		    		}
		    	}}
		    />),
		  },
		  {
		    title: '是否显示',
		    dataIndex: 'isShow',
		    key: 'isShow',
		    render:(isShow,record)=>(<Switch 
		    	checkedChildren="上架" 
		    	unCheckedChildren="下架" 
		    	checked={isShow == '1' ? true : false} 
		    	onChange={(checked)=>{
		    		const isShow = checked ? '1' : '0'
		    		handleUpdateIsShow(record._id,isShow)
		    	}}
		    />)
		  },
		  {
		    title: '排序',
		    key: 'order',
		    dataIndex: 'order',
		    render: (order,record)=>(<InputNumber 
		    	defaultValue={order}
		    	onBlur={(ev)=>{
		    		if(ev.target.value != order){
		    			// console.log(record)
		    			handleUpdateOrder(record._id,ev.target.value)
		    		}
		    	}}
		    />),
		  },
		];
		const {
			list,
			current,
			pageSize,
			total,
			handlePage,
			isFetching,
			handleUpdateName,
			handleUpdateMobileName,
			handleUpdateOrder,
			handleUpdateIsShow,
		} = this.props
    	const dataSource = list.toJS()
    	// console.log(list.toJS())
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
		isFetching:state.get('category').get('isFetching'),
		list:state.get('category').get('list'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'), 
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreators.getPageAction(page))
		},
		handleUpdateName:(id,newName)=>{
			// console.log('handleUpdateName',id,name)
			dispatch(actionCreators.getUpdateNameAction(id,newName))
		},	
		handleUpdateMobileName:(id,newMobileName)=>{
			dispatch(actionCreators.getUpdateMobileNameAction(id,newMobileName))
		},
		handleUpdateOrder:(id,newOrder)=>{
			dispatch(actionCreators.getUpdateOrderAction(id,newOrder))
		},
		handleUpdateIsShow:(id,newIsShow)=>{
			dispatch(actionCreators.getUpdateIsShowAction(id,newIsShow))
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)