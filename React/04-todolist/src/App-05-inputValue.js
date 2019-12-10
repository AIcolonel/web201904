/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-25 11:44:41
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	handleClick(){
		console.log(this)
		console.log('btn click...')
	}
	handleInput(ev){
		console.log(this)
		console.log(ev.currentTarget.value)
		console.log(ev.target.value)
	}
	render(){
		return (
			<div className="App">
				<input onChange={this.handleInput.bind(this)} />
				<button className="btn" onClick={this.handleClick.bind(this)}>提交</button>
				<ul className='list'>
					<li>吃饭</li>
					<li>睡觉</li>
					<li>打豆豆</li>
				</ul>
			</div>
		)
		
	}
}

export default App