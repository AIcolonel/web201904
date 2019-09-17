/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-16 09:20:35
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Card,Row,Col } from 'antd'

import Layout from 'common/layout'

import "./index.css"
import { actionCreator } from './store'

class Home extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.handleCount()
    }
    render() {
        const {usernum,ordernum,productnum } = this.props
        return (
        <div className="Home">
             <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content">
                    <Row>
                      <Col span={8}>
                        <Card title="用户数" bordered={false} style={{ width: 300 }}>
                          <p>{usernum}</p>
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card title="商品数" bordered={false} style={{ width: 300 }}>
                          <p>{productnum}</p>
                        </Card>                      
                      </Col>
                      <Col span={8}>
                        <Card title="订单数" bordered={false} style={{ width: 300 }}>
                          <p>{ordernum}</p>
                        </Card>  
                      </Col>
                    </Row>                                                        
                </div>
             </Layout>
        </div>
        );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({
    usernum:state.get('home').get('usernum'),
    ordernum:state.get('home').get('ordernum'),
    productnum:state.get('home').get('productnum'),    
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleCount:()=>{
        dispatch(actionCreator.getCountAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)