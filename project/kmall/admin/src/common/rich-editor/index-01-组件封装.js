/*
* @Author: Chen
* @Date:   2019-12-11 15:28:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-11 16:02:18
*/
import React,{Component} from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
import $ from 'jquery'

class RichEditor extends Component{
	constructor(props){
		super(props)
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
		const editor = new Simditor({
		  	textarea: this.textarea,
		  	toolbar:this.toolbar,
		  	upload:{
		  		url:this.props.url,
		  		fileKey:'upload'
		  	}
		})
	}
	render(){
		return (
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor" ></textarea>
		)
	}
}

export default RichEditor