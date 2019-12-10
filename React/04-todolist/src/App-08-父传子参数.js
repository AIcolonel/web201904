/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-26 09:51:52
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
	}
	handleAdd(){
		this.setState({
			list:[...this.state.list,this.state.task],
			task:''
		})
	}
	handleInput(ev){
		const val = ev.target.value
		this.setState(() => ({
			task: val
		}))
	}
	handleDelete(index){
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState({
			list:list
		})
	}
	render(){
		return (
			<div className="App">
				<input onChange={this.handleInput.bind(this)} value={this.state.task} />
				<button className="btn" onClick={this.handleAdd.bind(this)}>提交</button>
				<ul className='list'>
					{
						this.state.list.map((item,index)=>{
							return (
								<Item key={index} task={item} />
							)
						})
					}
				</ul>
			</div>
		)
		
	}
}

export default App