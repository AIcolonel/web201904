/*
* @Author: Chen
* @Date:   2019-11-26 09:49:21
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-26 10:31:12
*/
import React,{Component} from 'react'

class Item extends Component{
	constructor(props){
		super(props)
	}
	/*
	handleDel(index){
		console.log(index)
		console.log(this.props.list)
		this.props.list.splice(index,1)
		console.log(this.props.list)
	}
	*/
	render(){
		return (
			// <li onClick={this.handleDel.bind(this,this.props.index)}>{this.props.task}</li>
			<li onClick={this.props.handleDel}>{this.props.task}</li>
		)
	}
}

export default Item