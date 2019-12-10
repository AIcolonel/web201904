/*
* @Author: Chen
* @Date:   2019-12-02 09:30:34
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-04 11:55:23
*/
import React,{Component,Fragment} from 'react'
import {actionCreators} from './store'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox   } from 'antd'
import './index.css'

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.handleLogin(values)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div className="Login">
            <Form className="login-form">
		        <Form.Item>
		          {getFieldDecorator('username', {
		            rules: [{ required: true, message: '请输入用户名!' },{pattern:/^[a-z][0-9a-z_]{2,5}$/i,message:'用户名以字母开头的3-6位字符'}],
		          })(
		            <Input
		              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
		              placeholder="用户名" autocomplate='off'
		            />,
		          )}
		        </Form.Item>
		        <Form.Item>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: '请输入密码!' },{pattern:/^\w{3,6}$/i,message:'密码是3-6位任意字符'}],
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
		          	className="login-form-button btn-login"
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
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

//将属性映射到组件
const mapStateToProps = (state)=>{
	return {
		isFetching:state.get('login').get('isFetching'),
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleLogin:(values)=>{
			dispatch(actionCreators.getLoginAction(values))
		}
		
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)