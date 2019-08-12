import React,{ Component } from 'react'
import PropTypes from 'prop-types';

class Item extends Component{
	render(){
		console.log('Item render .....')
		const { handleDel,content } = this.props;
		return (
			<li onClick={this.props.handleDel}>
				{this.props.content}
			</li>
		)
	}
	componentWillUnmount(){
		console.log('Item componentWillUnmount')
	}
}

Item.propTypes = {
    content:PropTypes.string,
    handleDelete:PropTypes.func
}

Item.defaultProps = {
	content:"ssss"
}
export default Item