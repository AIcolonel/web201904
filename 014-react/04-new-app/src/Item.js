import React,{ Component } from 'react';

class Item extends Component{
	render(){
		return (
			<li onClick={this.props.handleDel}>
				{this.props.content}
			</li>
		)
	}
}

export default Item