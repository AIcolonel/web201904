import React,{Component,Fragment} from 'react';
import './index.css';
import { Button,Input,Row, Col,List, Typography  } from 'antd';
import Todolist from './pages/todolist/index.js';

/*容器组件*/
class App extends Component{
	render(){
		return(
			<div className="App">
				<Todolist />
			</div>
		)
	}
}



export default App;