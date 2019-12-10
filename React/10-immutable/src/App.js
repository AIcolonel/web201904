/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-02 19:28:22
*/
import React,{Component,Fragment} from 'react'
import './App.css'

import TodoList from './pages/todolist/index.js'

class App extends Component{
	render(){
		return (
			<div className="App">
				<TodoList />
			</div>
		)
	}
}

export default App