import React,{Component,Fragment} from 'react';
import './index.css';
import AppUI from './AppUI.js';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import store from '../store/index.js'
// import { CHANGE_ITEM,ADD_ITEM,DELETE_ITEM } from '../store/actionTypes.js'
import { 
	getAddActions,
	getChangeActions,
	getDeleteActions,
	getDataActions,
	getInitDataActions } 
from '../store/actionCreates.js'
const axios = require('axios');

/*容器组件*/
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
		this.handleDelete = this.handleDelete.bind(this);
	}
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
		const action = getInitDataActions();
		store.dispatch(action);
	}


	handleAdd(){
		const action = getAddActions();
		store.dispatch(action);
	}
	handleChange(ev){
		let val = ev.target.value;
		const action = getChangeActions(val);
		store.dispatch(action);
	}
	handleDelete(index){
		const action = getDeleteActions(index);
		store.dispatch(action);
	}
	render(){
		return( 
			<AppUI
			handleChange = {this.handleChange}
			val = {this.state.val}
			handleAdd = {this.handleAdd}
			list = {this.state.list}
			handleDelete = {this.handleDelete}
			/>
		)
	}
}

export default App;