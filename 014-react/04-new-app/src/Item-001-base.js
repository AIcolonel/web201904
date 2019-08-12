import React,{ Component } from 'react';

class Item extends Component{
	render(){
		const { handleDel,content } = this.props;
		return (
			<li onClick={this.props.handleDel}>
				{this.props.content}
			</li>
		)
	}
}

export default Item