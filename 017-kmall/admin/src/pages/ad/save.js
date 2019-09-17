/*
* @Author: Tom
* @Date:   2019-04-17 16:11:21
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-22 22:16:17
*/
import React, { Component } from 'react'
import {
  Form, Input,  Select, Row, Col,  Button,Breadcrumb,InputNumber
} from 'antd';

const { Option } = Select;

import { connect } from 'react-redux'
import { actionCreator } from './store'

import { 
	UPLOAD_AD_IMAGE
} from 'api/config.js'

import Layout from 'common/layout'
import UploadImage from  'common/upload-image'


class ProductSave extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        	adId:this.props.match.params.adId
        }
    }
    componentDidMount(){
    	if(this.state.adId){
    		this.props.handleAdDetail(this.state.adId)
    	}
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        	values.id = this.state.adId;
        	this.props.handleSave(err,values)
        });
    }    	
	render(){
		const { getFieldDecorator } = this.props.form;
		const { 
            imageValidateStatus,
            imageHelp,
            handleImage,                       
            image,
            name,
            link,
            position,
            order,
            isShow,
            handleDetail,
		} = this.props;
        const imageFileList = []
        if(image){
            imageFileList.push({
                uid:0,
                status:'done',
                url:image,
                response:{
                    url:image
                }                  
            })
        }		
		return(
			<Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>广告管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                    {
                        this.state.adId ? "编辑广告" : "添加广告"
                    }
                    </Breadcrumb.Item>
				</Breadcrumb>			
				<div className="content">
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
			        <Form.Item
			          label="广告名称"
			        >
			          {getFieldDecorator('name', {
			            rules: [
			            {
			              required: true, message: '请输入广告名称!',
			            }],
			            initialValue:name
			          })(
			            <Input placeholder="广告名称" />
			          )}
			        </Form.Item>
			        <Form.Item
			          label="广告地址"
			        >
			          {getFieldDecorator('link', {
			            rules: [
			            {
			              required: true, message: '请输入广告地址!',
			            }],
			            initialValue:link
			          })(
			            <Input placeholder="广告地址" />
			          )}
			        </Form.Item>                    
                    <Form.Item
                      label="广告位置"
                    >
                      {getFieldDecorator('position', {
                        rules: [
                        {
                          required: true, message: '请输选择广告位置!',
                        }],
                        initialValue:position
                      })(
                        <Select style={{ width: 300 }}>
                            <Option key="1" value="1">首页轮播图</Option>
                        </Select>
                      )}
                    </Form.Item> 			        
                    <Form.Item
                      label="广告图片"
                      required={true}
                      validateStatus={imageValidateStatus}
                      help={imageHelp}                       
                    >
                        <UploadImage
                            action={UPLOAD_AD_IMAGE}
                            max={1}
                            fileList={imageFileList}
                            getFileList={(filelist)=>{
                                handleImage(filelist)
                            }}                            
                         />
                    </Form.Item>                    			        			        			        			        			        			        
                    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                      <Button 
                        type="primary"
                        onClick={this.handleSubmit}  
                      >
                        提交
                      </Button>
                    </Form.Item>			        			        					
				</Form>
                </div>
			</Layout>
		)
	}
}
const WrappedProductSave = Form.create()(ProductSave);

const mapStateToProps = (state)=>{
	return {
		imageValidateStatus:state.get('ad').get('imageValidateStatus'),
		imageHelp:state.get('ad').get('imageHelp'),
		image:state.get('ad').get('image'),
		name:state.get('ad').get('name'),
        link:state.get('ad').get('link'),
        position:state.get('ad').get('position'),
        order:state.get('ad').get('order'),
        isShow:state.get('ad').get('isShow')
	}
}
const mapDispatchToProps = (dispatch)=>{
	return{
		handleSave:(err,values)=>{
			dispatch(actionCreator.getSaveAction(err,values));
		},
        handleImage:(fileList)=>{
            dispatch(actionCreator.getSetImageAction(fileList));
        },        
		handleAdDetail:(productId)=>{
			dispatch(actionCreator.getAdDetailAction(productId));
		}				
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave)
