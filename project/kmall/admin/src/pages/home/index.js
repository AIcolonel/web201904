/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 09:59:06
*/
import React,{Component,Fragment} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import { Breadcrumb,Card,Row, Col  } from 'antd'
import './index.css'

import Layout from 'common/layout'

class Home extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.handleCount()
	}
    render() {
    	const {usernum,ordernum,productnum} = this.props
        return (
        <div className="Home">
        	<Layout>
        		<Breadcrumb style={{ margin: '16px 0' }}>
			      <Breadcrumb.Item>首页</Breadcrumb.Item>
			    </Breadcrumb>
        		<div className='content'>
        			<Row>
				      <Col span={8}>
				      	<Card title="用户数" bordered={false} style={{ width: 300 }}>
					      <p>{usernum}</p>
					    </Card>
				      </Col>
				      <Col span={8}>
				      	<Card title="商品数" bordered={false} style={{ width: 300 }}>
					      <p>{ordernum}</p>
					    </Card>
				      </Col>
				      <Col span={8}>
				      	<Card title="订单数" bordered={false} style={{ width: 300 }}>
					      <p>{productnum}</p>
					    </Card>
				      </Col>
				    </Row>
        		</div>
        	</Layout>
		</div>
        );
    }
}

//将属性映射到组件
const mapStateToProps = (state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		ordernum:state.get('home').get('ordernum'),
		productnum:state.get('home').get('productnum')
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleCount:()=>{
			dispatch(actionCreators.getCountAction())
		}		
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)