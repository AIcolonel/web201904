import React,{Component,Fragment} from 'react';
import './index.css';
import { Result } from 'antd';
import { Link } 
from "react-router-dom";

/*容器组件*/
class Err extends Component{
	render(){
		return (
			<div className="Err">
				<Result
			    status="error"
			    title="你访问的页面走丢啦!!!"
			    extra={
			      <Link to="/">
			        返回首页
			      </Link>
			    }
			    />
			</div>
		)
	}
}

export default Err;