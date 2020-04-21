/*
* @Author: Chen
* @Date:   2019-12-11 15:28:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-13 15:28:33
*/
import React,{Component} from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import $ from 'jquery'

class RichEditor extends Component{
	constructor(props){
		super(props)
		this.state = {
			isLoaded:false
		}
		this.toolbar = [
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol',             
			  'ul',             
			  'blockquote',
			  'code',          
			  'table',
			  'link',
			  'image',
			  'hr',            
			  'indent',
			  'outdent',
			  'alignment',
			]
		// console.log($)
		//发送ajax携带cookie
		$.ajaxSetup({
			xhrFields:{
				withCredentials: true
			}
		})
	}
	componentDidMount(){
		this.editor = new Simditor({
		  	textarea: this.textarea,
		  	toolbar:this.toolbar,
		  	upload:{
		  		url:this.props.url,
		  		fileKey:'upload'
		  	}
		})
		//监听事件获取编辑器值
		this.editor.on('valuechanged',()=>{
			//获取内容
			// this.props.getValue(this.editor.getValue())
			this.setState({isLoaded:true},()=>{
				this.props.getValue(this.editor.getValue())
			})
		})
	}
	componentDidUpdate(){
		//数据回填
		if(this.props.values && !this.state.isLoaded){
			this.editor.setValue(this.props.values)
			this.setState({isLoaded:true})
		}
	}
	render(){
		return (
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor" ></textarea>
		)
	}
}

export default RichEditor