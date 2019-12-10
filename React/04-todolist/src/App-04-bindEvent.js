/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-25 11:33:59
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	handleClick(){
		console.log(this)
		console.log('btn click...')
	}
	render(){
		return (
			<div className="App">
				{
					/*<input /><button className="btn" onClick={()=>{console.log('btn click...')}}>提交</button>*/
				}	
				<input /><button className="btn" onClick={this.handleClick.bind(this)}>提交</button>
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