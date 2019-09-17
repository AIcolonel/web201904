/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-21 15:38:20
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from './store'

import { Breadcrumb,Form, Select, Input, Button,InputNumber } from 'antd'
const { Option } = Select

import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGES } from 'api/config.js'

import Layout from 'common/layout'

import "./index.css"

class ProductSave extends Component {

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
          productId:this.props.match.params.productId
        }
    }
    componentDidMount(){
        this.props.getLevelCategories()
        if(this.state.productId){
          this.props.getProductDetail(this.state.productId)
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          values.id = this.state.productId
          this.props.handleSave(err,values)
        })
    }    
    render() {
        const { getFieldDecorator } = this.props.form
        const {
          categories,
          mainImageValidateStatus,
          mainImageHelp,
          imagesValidateStatus,
          imagesHelp,
          category,
          name,
          description,
          price,
          stock,
          detail,
          mainImage,
          images,          
          handleMainImage,
          handleImages,
          handleDetail
        } = this.props
        const mainImageFileList = []
        let imagesFileList = []
        if(mainImage){
          mainImageFileList.push({
            uid: '0',
            status: 'done',
            url: mainImage,
            response:{
              url:mainImage
            }
          })
        }
        if(images){
          imagesFileList = images.split(',').map((url,index)=>({
            uid: index,
            status: 'done',
            url: url, 
            response:{
              url:url
            }                       
          }))
        }
        return (
            <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {this.state.productId ? "修改商品" : "添加商品"}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className="content">
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
                        <Form.Item label="商品分类">
                          {getFieldDecorator('category', {
                            rules: [{ required: true, message: '请选择商品分类' }],
                            initialValue:category
                          })(
                            <Select
                              placeholder="请选择商品分类"
                            >
                              {
                                categories.map((category)=>{
                                    return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
                                })
                              }
                            </Select>,
                          )}
                        </Form.Item>                    
                        <Form.Item label="商品名称">
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入商品名称' }],
                            initialValue:name
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="商品描述">
                          {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入商品描述' }],
                            initialValue:description
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="商品价格">
                          {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入商品价格' }],
                            initialValue:price
                          })(<InputNumber min={0} />)}
                        </Form.Item>
                        <Form.Item label="商品库存">
                          {getFieldDecorator('stock', {
                            rules: [{ required: true, message: '请输入商品价格' }],
                            initialValue:stock
                          })(<InputNumber min={0} />)}
                        </Form.Item>
                        <Form.Item 
                          label="封面图片" 
                          required={true}
                          validateStatus={mainImageValidateStatus}
                          help={mainImageHelp}
                        >
                          <UploadImage  
                            max={1}
                            action={UPLOAD_PRODUCT_IMAGE}
                            getFileList={
                              (fileList)=>{
                                handleMainImage(fileList)
                              }
                            }
                            fileList={mainImageFileList}
                          />
                        </Form.Item>
                        <Form.Item 
                          label="商品图片" 
                          required={true}
                          validateStatus={imagesValidateStatus}
                          help={imagesHelp}
                        >
                          <UploadImage 
                            max={3}
                            action={UPLOAD_PRODUCT_IMAGE}
                            getFileList={
                              (fileList)=>{
                                handleImages(fileList)
                              }
                            }
                            fileList={imagesFileList}                            
                          />
                        </Form.Item>
                        <Form.Item label="商品详情">
                          <RichEditor
                            url={UPLOAD_PRODUCT_DETAIL_IMAGES}
                            getValues={
                              (values)=>{
                                handleDetail(values)
                              }
                            }
                            values={detail}
                          />
                        </Form.Item>                                                                                                                                                        
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                          <Button type="primary" onClick={this.handleSubmit}>
                            提交
                          </Button>
                        </Form.Item>
                      </Form>                                  
                </div>                
            </Layout>
        )
    }
}

const WrappedProductSave = Form.create({ name: 'product' })(ProductSave)

//映射属性到组件
const mapStateToProps = (state) => ({
    categories:state.get('product').get('categories'),
    mainImageValidateStatus:state.get('product').get('mainImageValidateStatus'),    
    mainImageHelp:state.get('product').get('mainImageHelp'), 
    imagesValidateStatus:state.get('product').get('imagesValidateStatus'),   
    imagesHelp:state.get('product').get('imagesHelp'),
    category:state.get('product').get('category'),
    name:state.get('product').get('name'),
    description:state.get('product').get('description'),
    price:state.get('product').get('price'),
    stock:state.get('product').get('stock'),
    detail:state.get('product').get('detail'),        
    mainImage:state.get('product').get('mainImage'),        
    images:state.get('product').get('images'),        
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleMainImage:(fileList)=>{
      dispatch(actionCreator.setMainImageAction(fileList))
    },
    handleImages:(fileList)=>{
      dispatch(actionCreator.setImagesAction(fileList))
    },
    handleDetail:(values)=>{
      dispatch(actionCreator.setDetailAction(values))
    },          
    handleSave:(err,values)=>{
        dispatch(actionCreator.getSaveAction(err,values))
    },
    getLevelCategories:()=>{
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    getProductDetail:(productId)=>{
        dispatch(actionCreator.getProductDetailAction(productId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProductSave)