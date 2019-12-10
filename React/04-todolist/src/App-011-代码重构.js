/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-26 11:17:06
*/
import React,{Component,Fragment} from 'react'
import './App.css'

import Item from './Item.js'

class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			list:["吃饭","睡觉","打游戏"],
			task:''
		}
		this.handleInput = this.handleInput.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd(){
		this.setState((preState)=>({
			list:[...preState.list,preState.task],
			task:''
		}))
	}
	handleInput(ev){
		const val = ev.target.value
		this.setState((preState) => ({
			task: val
		}))
	}
	handleDelete(index){
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState((preState)=>({
			list:list
		}))
	}
	getItems(){
		return this.state.list.map((item,index)=>{
			return (
				<Item key={index} index={index} task={item} handleDel={this.handleDelete.bind(this,index)} />
			)
		})
	}
	render(){
		console.log('App render ...')
		return (
			<div className="App">
				<input onChange={this.handleInput.bind(this)} value={this.state.task} />
				<button className="btn" onClick={this.handleAdd.bind(this)}>提交</button>
				<ul className='list'>
					{
						this.getItems()
					}
				</ul>
			</div>
		)
		
	}
}

export default App