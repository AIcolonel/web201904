/*
* @Author: Chen
* @Date:   2019-11-26 09:49:21
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-26 10:51:15
*/
import React,{Component} from 'react'

class Item extends Component{
	constructor(props){
		super(props)
	}
	render(){
		const { handleDel,task } = this.props
		return (
			<li onClick={handleDel}>{task}</li>
		)
	}
}

export default Item