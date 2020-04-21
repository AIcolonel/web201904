/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 11:35:36
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import {
  Link,
} from "react-router-dom";
import { Breadcrumb,Table, Tag ,Button,Input,InputNumber,Switch,Divider   } from 'antd'
import './index.css'
import moment from 'moment'
const { Search } = Input

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
		    title: '商品名称',
		    dataIndex: 'name',
		    key: 'name',
		    render:(name)=>{
		    	if(keyword){
		    		///(keyword)/ig
		    		const reg = new RegExp('('+keyword+')','ig')
		    		let newName = name.replace(reg,'<b style="color:red;">$1</b>')
		    		return <span dangerouslySetInnerHTML={{__html:newName}} />
		    	}else{
		    		return name
		    	}
		    }
		  },
		  {
		    title: '是否首页显示',
		    dataIndex: 'isShow',
		    key: 'isShow',
		    render:(isShow,record)=>(<Switch 
		    	checkedChildren="显示" 
		    	unCheckedChildren="隐藏" 
		    	checked={isShow == '1' ? true : false} 
		    	onChange={(checked)=>{
		    		const isShow = checked ? '1' : '0'
		    		handleUpdateIsShow(record._id,isShow)
		    	}}
		    />)
		  },
		  {
		    title: '上架/下架',
		    dataIndex: 'status',
		    key: 'status',
		    render:(status,record)=>(<Switch 
		    	checkedChildren="显示" 
		    	unCheckedChildren="隐藏" 
		    	checked={status == '1' ? true : false} 
		    	onChange={(checked)=>{
		    		const status = checked ? '1' : '0'
		    		handleUpdateStatus(record._id,status)
		    	}}
		    />)
		  },
		  {
		    title: '是否热卖',
		    dataIndex: 'isHot',
		    key: 'isHot',
		    render:(isHot,record)=>(<Switch 
		    	checkedChildren="是" 
		    	unCheckedChildren="否" 
		    	checked={isHot == '1' ? true : false} 
		    	onChange={(checked)=>{
		    		const isHot = checked ? '1' : '0'
		    		handleUpdateIsHot(record._id,isHot)
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
		  {
		  	title:'操作',
		  	render:(text,record)=>(
		  		<span>
		  			<Link to={"/product/save/"+record._id}>修改</Link>
		  			<Divider type="vertical" />
		  			<Link to={"/product/detail/"+record._id}>查看</Link>
		  		</span>
		  	)
		  }
		];
		const {
			list,
			current,
			pageSize,
			total,
			keyword,
			handlePage,
			isFetching,
			handleUpdateIsShow,
			handleUpdateStatus,
			handleUpdateIsHot,
			handleUpdateOrder
		} = this.props
    	const dataSource = list.toJS()
    	// console.log(list.toJS())
        return (
        <div className="CategoryList">
        	<Layout>
        		<Breadcrumb style={{ margin: '16px 0' }}>
			      <Breadcrumb.Item>首页</Breadcrumb.Item>
			      <Breadcrumb.Item>商品管理</Breadcrumb.Item>
			      <Breadcrumb.Item>商品列表</Breadcrumb.Item>
			    </Breadcrumb>
			    <div className='btn'>
			    	<Search 
			    		placeholder="请输入关键词" 
			    		onSearch={
			    			value => handlePage(1,value)
			    		} 
			    		enterButton 
			    		style={{width:300}}
			    	/>
			    	<Link to='/product/save'>
			    		<Button type="primary" className='btn-add'>添加商品</Button>
			    	</Link>
        		</div>
        		<div className='content'>
        			<Table 
        				columns={columns} 
        				dataSource={dataSource} 
        				rowKey='_id'
        				pagination={{
        					current:current,
        					pageSize:pageSize,
        					total:total
        				}}
        				onChange={(page)=>{
        					if(keyword){
        						handlePage(page.current,keyword)
        					}else{
        						handlePage(page.current)
        					}
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
		isFetching:state.get('product').get('isFetching'),
		list:state.get('product').get('list'),
		current:state.get('product').get('current'),
		pageSize:state.get('product').get('pageSize'),
		total:state.get('product').get('total'), 
		keyword:state.get('product').get('keyword'), 
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page,keyword)=>{
			dispatch(actionCreators.getPageAction(page,keyword))
		},
		handleUpdateIsShow:(id,newIsShow)=>{
			dispatch(actionCreators.getUpdateIsShowAction(id,newIsShow))
		},
		handleUpdateStatus:(id,newStatus)=>{
			dispatch(actionCreators.getUpdateStatusAction(id,newStatus))
		},
		handleUpdateIsHot:(id,newIsHot)=>{
			dispatch(actionCreators.getUpdateIsHotAction(id,newIsHot))
		},
		handleUpdateOrder:(id,newOrder)=>{
			dispatch(actionCreators.getUpdateOrderAction(id,newOrder))
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)