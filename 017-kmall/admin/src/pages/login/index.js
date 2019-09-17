/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-18 10:20:20
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import "./index.css"
import { actionCreator } from './store'

class NormalLoginForm extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                this.props.handleLogin(values)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div className="Login">
        <Form className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入您的用户名!' },{pattern:/^[a-z][a-z0-9_]{2,5}$/,message:'密码以字母开头的3到6位字符'}],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码!' },{pattern:/^\w{3,6}$/,message:'密码为3-6位任意字符'}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
                <Button 
                    type="primary"  
                    className="login-form-button"
                    onClick={this.handleSubmit}
                    loading={this.props.isFetching}
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
        </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

//映射属性到组件
const mapStateToProps = (state) => ({
    isFetching: state.get('login').get('isFetching')
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleLogin: (values) => {
        dispatch(actionCreator.getLoginAction(values))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)