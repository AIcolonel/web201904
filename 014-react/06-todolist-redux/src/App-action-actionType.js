import React,{Component,Fragment} from 'react';
import './index.css';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import store from '../store/index.js'
import { CHANGE_ITEM,ADD_ITEM,DELETE_ITEM } from '../store/actionTypes.js'
import { getAddActions,getChangeActions,getDeleteActions } from '../store/actionCreates.js'

class App extends Component{
	constructor(props){
		super(props);
		
		// console.log(store)
		//初始化时获取数据
		this.state = store.getState();
		//数据发生改变时,触发store.subscribe方法
		store.subscribe(()=>{
			// console.log(store.getState())
			return this.setState(()=>store.getState())
		})

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd(){
		/*
		const action = {
			type:ADD_ITEM
		}
		*/
		const action = getAddActions();
		store.dispatch(action);
	}
	handleChange(ev){
		let val = ev.target.value;
		//派发action
		/*
		const action = {
			type:CHANGE_ITEM,
			payload:val
		}
		*/
		const action = getChangeActions(val);
		store.dispatch(action);
	}
	handleDelete(index){
		/*
		const action = {
			type:DELETE_ITEM,
			payload:index
		}
		*/
		const action = getDeleteActions(index);
		store.dispatch(action);
	}
	render(){
		return( 
			<div className='App'>
				<Row>
					<Col span={12}>
					<Input 
					ref={(input)=>{
						this.input = input;
					}} 
					onChange={this.handleChange} 
					value={this.state.val} 
					/>
					</Col>
					<Col span={12}>
					<Button type="primary" onClick={this.handleAdd} >新增</Button>
					</Col>
				</Row>
				<List
				  style={{marginTop:"10px"}}
			      size="small"
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item,index) => <List.Item onClick={this.handleDelete.bind(this,index)}>{item}</List.Item>}
			    />
			</div>
		)
	}
}

export default App;