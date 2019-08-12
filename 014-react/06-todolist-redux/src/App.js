import React,{Component,Fragment} from 'react';
import './index.css';
import AppUI from './AppUI.js';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import store from '../store/index.js'
import { CHANGE_ITEM,ADD_ITEM,DELETE_ITEM } from '../store/actionTypes.js'
import { getAddActions,getChangeActions,getDeleteActions } from '../store/actionCreates.js'

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