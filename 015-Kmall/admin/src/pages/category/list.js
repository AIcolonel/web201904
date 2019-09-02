import React,{Component,Fragment} from 'react';
import './index.css';
import { Table, Divider, Tag,Breadcrumb ,Button,Input,InputNumber,Switch  } from 'antd';
import {actionCreaters} from './store/index.js';
import { connect } from 'react-redux';
import AdminLayout from 'common/layout/index.js';
import { Link } 
from "react-router-dom";

/*容器组件*/
class CategoryList extends Component{
	componentDidMount(){
		this.props.handlePage(1);
	}
	render(){
		const columns = [
		  {
		    title: '分类名称',
		    dataIndex: 'name',
		    key: 'name',
		    render:(name,record)=>(
		    	<Input 
		    	style={{width:'40%'}} 
		    	defaultValue={name}
		    	onBlur = {(ev)=>{
		    		// console.log(record)
		    		//更新分类名称
		    		if(ev.target.value != name){
		    			handleUpdateName(record._id,ev.target.value)
		    		}
		    	}}
		    	/>
		    )
		  },
		  {
		    title: '手机分类名称',
		    dataIndex: 'mobileName',
		    key: 'mobileName',
		    render:(mobileName,record)=>(
		    	<Input 
		    	style={{width:'40%'}} 
		    	defaultValue={mobileName}
		    	onBlur = {(ev)=>{
		    		// console.log(record)
		    		//更新分类名称
		    		if(ev.target.value != mobileName){
		    			handleUpdateMobileName(record._id,ev.target.value)
		    		}
		    	}}
		    	/>
		    )
		  },
		  {
		    title: '是否显示',
		    dataIndex: 'isShow',
		    key: 'isShow',
		    render:(isShow,record)=>(
		    	<Switch 
		    	checkedChildren="显示" 
		    	unCheckedChildren="隐藏" 
		    	defaultChecked={!!isShow} 
		    	onChange={(checked)=>{
		    		// console.log(checked);
		    		let show = ''
		    		if(checked){
		    			show = '1'
		    		}else{
		    			show = '0'
		    		}
		    		handleUpdateShow(record._id,show)
		    	}}
		    	/>
		    )
		  },
		  {
		    title: '排序',
		    key: 'order',
		    dataIndex: 'order',
		    render:(order,record)=>(
		    	<InputNumber 
		    	defaultValue={order}
		    	onBlur = {(ev)=>{
		    		// console.log(record)
		    		//更新分类名称
		    		if(ev.target.value != order){
		    			handleUpdateOrder(record._id,ev.target.value)
		    		}
		    	}}
		    	/>
		    )
		  }
		];
		const { 
			list,
			current,
			pageSize,
			total,
			handlePage,
			isLoading,
			handleUpdateName,
			handleUpdateMobileName,
			handleUpdateOrder,
			handleUpdateShow
		} = this.props;
		//对数据进行处理
		/*
		const data = list.map(category=>{
			return {
				key:category.get('_id'),
				name: category.get('name'),
		    	mobileName: category.get('mobileName') || '无',
		    	isShow: category.get('isShow'),
		    	order: category.get('order'),
		    	children:category.get('children')
			}
		}).toJS();
		*/
		const data = list.toJS();
		return (
			<div className="CategoryList">
				<AdminLayout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>首页</Breadcrumb.Item>
			          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
			          <Breadcrumb.Item>分类列表</Breadcrumb.Item>
			        </Breadcrumb>
			        <Link to="/category/add" className='clearfix'>
			        	<Button 
			        	type="primary"
			        	style={{marginBottom:16,float:'right'}}
			        	>添加分类</Button>
			        </Link>
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
		list:state.get('category').get('list'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		isLoading:state.get('category').get('isLoading')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			const action = actionCreaters.getPageAction(page);
			dispatch(action)
		},
		handleUpdateName:(id,newName)=>{
			// console.log(id,newName)
			const action = actionCreaters.getUpdateNameAction(id,newName)
			dispatch(action)
		},
		handleUpdateMobileName:(id,newMobileName)=>{
			const action = actionCreaters.getUpdateMobileNameAction(id,newMobileName)
			dispatch(action)
		},
		handleUpdateOrder:(id,newOrder)=>{
			const action = actionCreaters.getUpdateOrderAction(id,newOrder)
			dispatch(action)
		},
		handleUpdateShow:(id,show)=>{
			const action = actionCreaters.getUpdateShowAction(id,show)
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);