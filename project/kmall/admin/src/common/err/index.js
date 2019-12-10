/*
* @Author: Chen
* @Date:   2019-12-04 15:57:02
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-04 16:06:17
*/
import React,{Component} from 'react' 
import {Alert,Button } from 'antd'
import {Link} from "react-router-dom";
import './index.css'

class Err extends Component{
	render(){
		return (
			<div className='Err'>
				<Alert
			      message="Not Found"
			      description="您请求的页面走丢了,请确认请求地址是否正确"
			      type="error"
			      showIcon
			    />
			    <Link to='/'><Button type="link">返回首页</Button></Link>
			</div>
		)
	}
}

export default Err