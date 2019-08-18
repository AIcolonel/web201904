import React,{Component,Fragment} from 'react';
import './index.css';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import { connect } from 'react-redux';
import { 
	getAddActions,
	getChangeActions,
	getDeleteActions,
	getDataActions,
	getInitDataActions } 
from '../store/actionCreates.js';
const axios = require('axios');

/*容器组件*/
class App extends Component{
	//生命周期函数
	componentDidMount(){
		/*
		//发送请求
		// Make a request for a user with a given ID
		axios.get('http://127.0.0.1:3000')
		.then(function (response) {
		    // 拿到数据,派发action
		    const action = getDataActions(response.data);
			store.dispatch(action);
		})
		.catch(function (error) {
		    // handle error
		    console.log(error);
		})
		.finally(function () {
		    // always executed
		});
		*/
		this.props.handleData()
	}
	render(){
		return( 
			<div className='App'>
				<Row>
					<Col span={12}>
					<Input 
						value={this.props.val}
						onChange={this.props.handleChange}
					/>
					</Col>
					<Col span={12}>
					<Button type="primary" onClick={this.props.handleAdd}>新增</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:"10px"}}
			      size="small"
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => <List.Item onClick={this.props.handleDelete.bind(this,index)}>{item}</List.Item>}
			    />
			</div>
		)
	}
}

//映射的store里面的数据
const mapStateToProps = (state) => {
	// console.log(state)
  	return {
   	 	list:state.list,
   	 	val:state.val
  	}
}
//映射方法
const mapDispatchToProps = (dispatch)=>{
	return {
		handleChange:(e)=>{
			let val = e.target.value;
			const action = getChangeActions(val);
			dispatch(action);
		},
		handleAdd:()=>{
			const action = getAddActions();
			dispatch(action);
		},
		handleDelete:(index)=>{
			const action = getDeleteActions(index);
			dispatch(action);
		},
		handleData:()=>{
			const action = getInitDataActions();
		 	dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);