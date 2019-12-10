/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-25 15:49:49
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			list:["吃饭","睡觉","打游戏"],
			task:''
		}
	}
	handleClick(){
		/*
		console.log(this)
		console.log('btn click...')
		console.log(this.state)
		this.state.list.push(this.state.task)
		console.log(this.state)
		*/
		this.setState({
			list:[...this.state.list,this.state.task],
			task:''
		})
	}
	handleInput(ev){
		/*
		console.log(this)
		console.log(ev.target.value)
		console.log(this.state)
		this.state.task = ev.target.value
		console.log(this.state)
		*/
		/*
		this.setState({
			task:ev.target.value
		})
		*/
		const val = ev.target.value
		this.setState(() => ({
			task: val
		}))
	}
	render(){
		return (
			<div className="App">
				<input onChange={this.handleInput.bind(this)} value={this.state.task} />
				<button className="btn" onClick={this.handleClick.bind(this)}>提交</button>
				<ul className='list'>
					{
						this.state.list.map((item,index)=>{
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		)
		
	}
}

export default App