/*
* @Author: Tom
* @Date:   2019-04-17 16:11:21
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-28 17:15:38
*/
import React, { Component } from 'react'
import {
  Popconfirm, Button,Breadcrumb
} from 'antd';

import moment from 'moment';
import { connect } from 'react-redux'
import { actionCreator } from './store'
import Layout from 'common/layout'

import './detail.css'

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	orderNo:this.props.match.params.orderNo
        }
    }
    componentDidMount(){
    	if(this.state.orderNo){
    		this.props.handleOrderDetail(this.state.orderNo)
    	}
    }
   	
	render(){
		const {
			orderNo,
			createdAt,
			payment,
			paymentTypeDesc,
			productList,
			shipping,
			status,
			statusDesc
		} = this.props.order;	
		let createdTime = '';
		if(createdAt){
			createdTime = moment(createdAt).format('YYYY-MM-DD HH:mm:ss') 	
		}
		return(
			<Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>订单管理</Breadcrumb.Item>
                  <Breadcrumb.Item>订单商品</Breadcrumb.Item>
                </Breadcrumb>
				{
					orderNo
					?	<div className="order-detail">
							<div className="panel">
								<h2 className="panel-header">订单信息</h2>
								<div className="pandel-body">
									<ul className="order-info">
										<li className="order-no">
											<span className="lable">订单号:</span>
											<span className="text">{orderNo}</span>
										</li>
										<li className="order-create-time">
											<span className="lable">创建时间:</span>
											<span className="text">{createdTime}</span>
										</li>
										<li className="order-shipping-name">
											<span className="lable">收件人:</span>
											<span className="text">{shipping.name}({shipping.phone})</span>
										</li>
										<li className="order-shipping-address">
											<span className="lable">收件地址:</span>
											<span className="text">{shipping.province}{shipping.city}{shipping.address}(邮编:{shipping.zip})</span>
										</li>	
										<li className="order-status">
											<span className="lable">订单状态:</span>
											<span className="text">{statusDesc}</span>
										</li>					
										<li className="order-payment">
											<span className="lable">订单金额:</span>
											<span className="text">￥{payment}</span>
										</li>
										<li className="order-payment-type">
											<span className="lable">支付方式:</span>
											<span className="text">{paymentTypeDesc}</span>
										</li>
										<li className="order-opreation">
										{
											status == "30"
											? <Popconfirm 
												placement="top" 
												title={"确定已发货"} 
												onConfirm={()=>{
													this.props.handleOrderDeliver(orderNo)
												}} 
												okText="确定" 
												cancelText="取消">
													<Button type="primary">发货</Button>
											</Popconfirm>
											: null
										}
										</li>												
									</ul>
								</div>
							</div>
							<div className="panel">
								<h2 className="panel-header">商品列表</h2>
								<div className="pandel-body">
									<ul className="product-title clearfix">
										<li className="product-info">
											商品
										</li>
										<li className="product-price">
											单价
										</li>
										<li className="product-count">
											数量
										</li>
										<li className="product-totalPrice">
											小计
										</li>
									</ul>
								{
									productList.map((product,index)=>{
										return <ul className="product-item" key={index}>
													<li className="product-info text-ellipsis">
														<a href={"/product/detail/"+product.productId} className="link" target="_blank">
															<img src={product.mainImage} alt="" />
															<span>{product.name}</span>
														</a>
													</li>
													<li className="product-price">
														￥{product.price}
													</li>
													<li className="product-count">
														{product.count}
													</li>
													<li className="product-totalPrice">
														￥{product.totalPrice}
													</li>	
												</ul>
									})
								}
								</div>
							</div>					
						</div>					
					:null
				}			
			</Layout>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		order:state.get('order').get('order'),								
	}
}
const mapDispatchToProps = (dispatch)=>{
	return{
		handleOrderDetail:(orderNo)=>{
			dispatch(actionCreator.getOrderDetailAction(orderNo));
		},
		handleOrderDeliver:(orderNo)=>{
			dispatch(actionCreator.getOrderDeliverAction(orderNo));
		}				
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail)
