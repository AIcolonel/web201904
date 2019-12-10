/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-25 11:12:49
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	render(){
		return (
			<div>
				<input /><button className="btn">提交</button>
				<ul style={{color:'red'}}>
					<li>吃饭</li>
					<li>睡觉</li>
					<li>打豆豆</li>
				</ul>
			</div>
		)
		
	}
}

export default App