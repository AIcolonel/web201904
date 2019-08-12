import React,{Component,Fragment} from 'react';
import './index.css';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import store from '../store/index.js'

class App extends Component{
	constructor(props){
		super(props);
		/*
		this.state={
			list:["电视","冰箱","洗衣机"],
			val:''
		};
		*/
		console.log(store.subscribe(()=>{}));
		this.state = store.getState();
		store.subscribe(()=>{
			// console.log(store.getState())
			return this.setState(()=>store.getState())
		})

		this.handleChange = this.handleChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd(){
		//是一个异步过程
		this.setState((preState)=>({
			list:[...preState.list,preState.val],
			val:''
		}));
	}
	handleChange(ev){
		let val = ev.target.value;
		/*
		this.setState(()=>({
			val
		}))
		*/
		//派发action
		const action = {
			type:"change_item",
			payload:val
		}
		store.dispatch(action);
	}
	handleDelete(index){
		const arr = [...this.state.list];
		arr.splice(index,1);
		this.setState({
			list:[...arr]
		})
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