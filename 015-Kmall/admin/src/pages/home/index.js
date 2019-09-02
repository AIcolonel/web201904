import React,{Component,Fragment} from 'react';
import './index.css';
import { Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import {actionCreaters} from './store/index.js';
import AdminLayout from 'common/layout/index.js';

/*容器组件*/
class Home extends Component{
	componentDidMount(){
		this.props.handleCount();
	}
	render(){
		return (
			<div className="Home">
				<AdminLayout>
					<div style={{ background: '#ECECEC', padding: '30px' }}>
					    <Row gutter={16}>
					      <Col span={8}>
					        <Card title="用户统计" bordered={false}>
					          {this.props.usernum}
					        </Card>
					      </Col>
					      <Col span={8}>
					        <Card title="商品数量" bordered={false}>
					          {this.props.productnum}
					        </Card>
					      </Col>
					      <Col span={8}>
					        <Card title="订单量" bordered={false}>
					          {this.props.ordernum}
					        </Card>
					      </Col>
					    </Row>
					</div>
				</AdminLayout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		productnum:state.get('home').get('productnum'),
		ordernum:state.get('home').get('ordernum')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleCount:()=>{
			const action = actionCreaters.getCountAction();
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);