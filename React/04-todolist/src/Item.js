/*
* @Author: Chen
* @Date:   2019-11-26 09:49:21
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-27 10:46:09
*/
import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Item extends Component{
	constructor(props){
		super(props)
	}
	componentWillUnmount(){
		console.log('Item componentWillUnmount()')
	}
	render(){
		// console.log('Item render ...')
		const { handleDel,task } = this.props
		return (
			<li onClick={handleDel}>{task}</li>
		)
	}
}

Item.propTypes = {
	handleDel:PropTypes.func,
	task:PropTypes.string.isRequired
}
Item.defaultProps = {
	task:'learns...'
}

export default Item