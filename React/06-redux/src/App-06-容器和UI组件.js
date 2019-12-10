/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 10:57:07
*/
import React,{Component,Fragment} from 'react'
import { DatePicker,Button,Input,Row,Col,List   } from 'antd'
import './App.css'
import store from './store/index.js'
import {
	getChangeItemAction,
	getAddItemAction,
	getDelItemAction
} from './store/actionCreator.js'
import AppUI from './AppUI.js'


class App extends Component{
	constructor(props){
		super(props)
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)

		this.state = store.getState()
		//监听事件获取store中最新的数据
		store.subscribe(()=>{
			this.setState(store.getState())
		})
	}
	handleAdd(){
		//派发action
		store.dispatch(getAddItemAction())
	}
	handleInput(ev){
		const val = ev.target.value
		//派发action
		store.dispatch(getChangeItemAction(val))
	}
	handleDelete(index){
		//派发action
		store.dispatch(getDelItemAction(index))
	}
	render(){
		return (
			<AppUI 
				task = {this.state.task}
				list = {this.state.list}
				handleInput = {this.handleInput}
				handleAdd = {this.handleAdd}
				handleDelete = {this.handleDelete}
			/>
		)
	}
}

export default App