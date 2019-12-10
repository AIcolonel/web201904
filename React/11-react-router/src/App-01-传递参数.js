/*
* @Author: Chen
* @Date:   2019-11-25 10:45:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 10:06:00
*/
import React,{Component,Fragment} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TodoList from './pages/todolist/index.js'

class Home extends Component{
	render(){
		return (<h1>this is home page</h1>)
	}
}
class About extends Component{
	render(){
		return (<h1>this is about page</h1>)
	}
}
class User extends Component{
	render(){
		console.log(this.props.match.params.id)
		return (<h1>this is user page ,user id is {this.props.match.params.id}</h1>)
	}
}


class App extends Component{
	render(){
		return (
			<Router>
				<div className="App">
					<nav>
						<ul>
							<li><Link to='/'>Home</Link></li>
							<li><Link to='/todolist'>TodoList</Link></li>
							<li><Link to='/about'>About</Link></li>
							<li><Link to='/user/123'>User</Link></li>
						</ul>
					</nav>
						<Route path="/" exact component={Home} />
						<Route path="/todolist" component={TodoList} />
						<Route path="/about" render={()=>(<h1>this is about page</h1>)} />
						<Route path="/user/:id" component={User} />
					{
						// <Route path="/" exact><Home /></Route>
						// <Route path="/todolist"><TodoList /></Route>
						// <Route path="/about"><About /></Route>
						// <Route path="/user/:id"><User /></Route>
					}
					
				</div>
			</Router>
		)
	}
}

export default App