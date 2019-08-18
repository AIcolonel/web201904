import React,{Component,Fragment} from 'react';
import './index.css';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import { 
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Switch,
	Link } 
from "react-router-dom";

/*容器组件*/
class Home extends Component{
	render(){
		return <h2>this is a home page</h2>
	}
}
class About extends Component{
	render(){
		return <h2>this is a about page</h2>
	}
}
class Login extends Component{
	render(){
		return <h2>this is a login page</h2>
	}
}
class Info extends Component{
	render(){
		return <h2>this is a info page</h2>
	}
}
class Users extends Component{
	render(){
		// return <h2>this is a users page userId is {this.props.match.params.id}</h2>
		return <Switch>
			<Route exact path="/users" render={()=>(<h2>this is a user page,no id</h2>)} />
			<Route path="/users/commen" render={(route)=>(<h2>this is a user commen page</h2>)} />
			<Route path="/users/:id" render={(route)=>(<h2>this is a user page,id is {route.match.params.id}</h2>)} />
		</Switch>
	}
}


class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLogin:true
		}
	}
	render(){
		const ProtectRouter = ({component:Component,...rest})=>(
			<Route 
			{...rest}
			render={(props)=>(
				this.state.isLogin 
				? <Component {...props} />
				: <Login {...props} />
			)} />
		)
		return(
			<Router>
				<div className="App">
					<ul className="list">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/info">Info</Link>
						</li>
						<li>
							<Link to="/users">Users</Link>
						</li>
						<li>
							<Link to="/users/commen">Users/Commen</Link>
						</li>
						<li>
							<Link to="/users/123">Users:123</Link>
						</li>
					</ul>
					<Route path="/" exact component={Home} />
					<Route path="/about" render={()=>(<h1>About</h1>)} />
					<ProtectRouter path="/info" component={Info} />
					<ProtectRouter path="/users" component={Users} />
				</div>
			</Router>
		)
	}
}



export default App;