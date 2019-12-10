/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 09:37:36
*/
import React,{Component,Fragment} from 'react'
import store from './store/index.js'
import {
	getChangeItemAction,
	getAddItemAction,
	getDelItemAction,
	getLoadInitAction
} from './store/actionCreator.js'
import AppUI from './AppUI.js'
import axios from 'axios'

//容器组件
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
	componentDidMount(){
		//发送ajax请求
		axios.get('http://127.0.0.1:3000')
		.then(result=>{
			//派发action
			store.dispatch(getLoadInitAction(result.data))
		})
		.catch(err=>{
			console.log(err)
		})
		// store.dispatch(getLoadInitAction())
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