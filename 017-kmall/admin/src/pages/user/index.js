/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-16 17:14:58
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, Table } from 'antd'
import moment from 'moment'

import Layout from 'common/layout'

import "./index.css"
import { actionCreator } from './store'

const columns = [{
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '是否管理员',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render:(isAdmin)=>(isAdmin ? '是' : '否')
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '注册时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];


class User extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.handlePage(1)
    }
    render() {
        const { list,current,total,pageSize,handlePage,isFetching } = this.props
        const dataSource = list.map((user)=>{
            return {
                key:user.get('_id'),
                username:user.get('username'),
                isAdmin:user.get('isAdmin'),
                phone:user.get('phone'),
                email:user.get('email'),
                createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')  
            }
        }).toJS()
        return (
            <div className="User">
             <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                  <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content">
                    <Table 
                        dataSource={dataSource} 
                        columns={columns}
                        pagination={{
                            current:current,
                            total:total,
                            pageSize:pageSize
                        }}
                        onChange={
                            (page)=>{
                                handlePage(page.current)
                            }
                        }
                        loading={
                            {
                                spinning:isFetching,
                                tip:'数据正在努力的加载中'
                            }
                        }
                    />                                    
                </div>
             </Layout>
        </div>
        );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({
    list:state.get('user').get('list'),
    current:state.get('user').get('current'),
    total:state.get('user').get('total'),
    pageSize:state.get('user').get('pageSize'), 
    isFetching:state.get('user').get('isFetching'),  
})
//映射方法到组件
const mapDispatchToProps = (dispatch) =>({
    handlePage:(page)=>{
        dispatch(actionCreator.getPageAction(page))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)