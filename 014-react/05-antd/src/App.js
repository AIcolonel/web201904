import React,{Component,Fragment} from 'react';
import { DatePicker } from 'antd';
import './index.css';
// import 'antd/dist/antd.css';

class App extends Component{
	constructor(props){
		console.log('constructor render ....')
		super(props);
		this.state={
			
		};
	}
	render(){
		return( 
			<div className='App'>
				<DatePicker />
			</div>
		)
	}
}

export default App;