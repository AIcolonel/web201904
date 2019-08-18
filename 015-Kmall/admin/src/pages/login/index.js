const axios = require('axios');

import React,{Component,Fragment} from 'react';
import { connect } from 'react-redux';
import './index.css';
import { Form, Icon, Input, Button, message } from 'antd';
import {actionCreaters} from './store/index.js';

/*容器组件*/
class NormalLoginForm  extends Component{
	constructor(props){
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit (e){
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
    		
      		if (!err) {
      			/*
      			//数据加载
    			this.setState(()=>({isFething:true}))
        		//发送ajax请求
        		axios({
				  	method: 'post',
				  	url: 'http://127.0.0.1:3000/users/login',
				  	data:{
				  		username:values.username,
				  		password:values.password
				  	}
				})
				.then(function (response) {
				    if(response.data.code == 0){
				    	//登陆成功跳转后台首页
				    	window.location.href = '/';
				    }else if(response.data.code == 1){
				    	message.error(response.data.message)
				    }
				})
				.catch(err=>{
					console.log(err);
					message.error('网络错误,请稍后再试')
				})
				.finally(()=>{
					this.setState(()=>({isFething:false}))
				})
				*/
				this.props.handleLogin(values);
      		}
      		
      		
    	});
  	}
  	render() {
    	const { getFieldDecorator } = this.props.form;
	    return (
	    	<div className="Login">
			    <Form className="login-form">
			        <Form.Item>
			          {getFieldDecorator('username', {
			            rules: [{ required: true, message: '请输入用户名!' },{ pattern: /^[a-z][a-z0-9_]{3,6}$/, message: '请输入以字母开头的3-6的字符!' }],
			          })(
			            <Input
			              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
			              placeholder="用户名"
			            />,
			          )}
			        </Form.Item>
			        <Form.Item>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: '请输入密码!' },{ pattern: /^\w{3,6}$/, message: '请输入3-6的任意字符!' }],
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
			          loading= {this.props.isFething}
			          type="primary" 
			          htmlType="button" 
			          className="login-form-button"
			          onClick = {this.handleSubmit}
			          >
			            登录
			          </Button>
			        </Form.Item>
			    </Form>
		    </div>
		    );
	}
}

const mapStateToProps = (state)=>{
	return {
		isFething:state.get('login').get('isFething')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleLogin:(values)=>{
			//派发一个登陆的action
			const action = actionCreaters.getLoginAction(values);
			//其实这个action就是一个可以发送ajax的函数
			//action原本是不可以返回一个函数的只能够返回对象,但是安装了redux-thunk就可以返回函数
			dispatch(action);
		}
	}
}
//connect方法是react-redux数据管理,可以拿到顶层数据
//1.mapStateToProps第一个参数是指定映射整个store的state数据的方法,该方法返回一个对象
//对象里面的属性被映射到connect方法返回的方法的指定的UI组件上
//2.mapDispatchToProps第二个参数指定是映射方法的方法

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);