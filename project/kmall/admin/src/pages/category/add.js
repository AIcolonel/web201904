/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-09 12:00:39
*/
import React,{Component} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import { Breadcrumb,Form, Select, Input, Button } from 'antd'

import './index.css'
const { Option } = Select
import Layout from 'common/layout'


class CategoryAdd extends React.Component {
	constructor(props){
		super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
	}
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.handleAdd(values)
            }
        });
    }
    componentDidMount(){
        //获取最新的父级分类
        this.props.handleLevelCatagories()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { categories } = this.props
        return (
        <div className="CategoryAdd">
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                  <Breadcrumb.Item>新增分类</Breadcrumb.Item>
                </Breadcrumb>
                <div className='content'>
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Form.Item label="父级分类">
                          {getFieldDecorator('pid', {
                            rules: [{ required: true, message: '请选择父级分类' }],
                          })(
                            <Select
                            >
                              <Option value="0">根分类</Option>
                              { 
                                // console.log(categories)
                                categories.map((category)=>{
                                    return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option> 
                                })
                              }
                            </Select>,
                          )}
                        </Form.Item>
                        <Form.Item label="分类名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入分类名称' }],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="手机分类名称">
                          {getFieldDecorator('mobileName', {
                            rules: [{ required: true, message: '请输入手机分类名称' }],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                          <Button type="primary" onClick={this.handleSubmit}>
                            提交
                          </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Layout>
		</div>
        );
    }
}

const WrappedCategoryAdd = Form.create({ name: 'coordinated' })(CategoryAdd)
//将属性映射到组件
const mapStateToProps = (state)=>{
    return {
        categories:state.get('category').get('categories')
    }
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
    return {
        handleAdd:(values)=>{
            dispatch(actionCreators.getAddAction(values))
        },
        handleLevelCatagories:()=>{
            dispatch(actionCreators.getLevelCatagories())
        }     
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd)