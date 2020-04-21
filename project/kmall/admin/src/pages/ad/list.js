/*
 * @Author: Tom
 * @Date:   2019-04-09 17:02:09
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-22 22:15:05
 */
import React, { Component } from 'react'
import { Table, Divider, Tag, Breadcrumb, InputNumber, Button, Modal, Input, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Layout from 'common/layout'
import { actionCreator } from './store'

import './index.css'
class AdList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.handlePage(1)
    }
    render() {
        const {
            list,
            current,
            total,
            pageSize,
            handlePage,
            isPageFetching,
            handeleUpdateOrder,
            handeleUpdateIsShow,
        } = this.props;
        const columns = [{
                title: '广告名称',
                dataIndex: 'name',
                key: 'name',
                width: 300
            },
            {
                title: '广告缩略图',
                dataIndex: 'image',
                key: 'image',
                render: (image) => <img className="imgBox" src={image} />
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render: (order, record) => <InputNumber 
			  	defaultValue={order}
			  	onBlur={(e)=>{
			  		handeleUpdateOrder(record._id,e.target.value)
			  	}}
			  />
            },
            {
                title: '显示/隐藏',
                dataIndex: 'isShow',
                key: 'isShow',
                render: (isShow, record) => <Switch 
			  		checkedChildren="是" 
			  		unCheckedChildren="否" 
			  		checked={isShow=='0' ? false : true}
			  		onChange={checked=>{
			  			handeleUpdateIsShow(record._id,checked ? 1 : 0)
			  		}} 
			  	/>
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
			  	<Link to={"/ad/save/"+record._id} >修改</Link>
			  	</span>
                )
            },
        ];
        const dataSource = list.toJS()
        return (
            <div className="AdList">  
	            <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>广告管理</Breadcrumb.Item>
                  <Breadcrumb.Item>广告列表</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{marginBottom:16,height:40}} className='claerfix'>
						<Link to="/ad/save" style={{ float:'right'}}>
							<Button type="primary">新增广告</Button>
						</Link>
					</div>
					<div className="content">						
	            	<Table 
		            	dataSource={dataSource} 
		            	columns={columns}
		            	rowKey="_id"
		            	pagination={{
		            		current:current,
		            		total:total,
		            		pageSize:pageSize
		            	}} 
		            	onChange={(page)=>{
		            		handlePage(page.current)	
		            	}}
		            	loading={{
							spinning:isPageFetching,
							tip:'正在请求数据'		            		
		            	}}
	            	/>
	            	</div>            	
	            </Layout>  
	        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isPageFetching: state.get('ad').get('isPageFetching'),
        list: state.get('ad').get('list'),
        current: state.get('ad').get('current'),
        total: state.get('ad').get('total'),
        pageSize: state.get('ad').get('pageSize'),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handlePage: (page) => {
            dispatch(actionCreator.getPageAction(page))
        },
        handeleUpdateOrder: (id, newOrder) => {
            dispatch(actionCreator.getUpdateOrderAction(id, newOrder));
        },
        handeleUpdateIsShow: (id, newIsShow) => {
            dispatch(actionCreator.getUpdateIsShowAction(id, newIsShow));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdList)