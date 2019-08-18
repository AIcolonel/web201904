import React,{Component,Fragment} from 'react';
import './index.css';
import { Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import AdminLayout from 'common/layout/index.js';

/*容器组件*/
class Home extends Component{
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

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);