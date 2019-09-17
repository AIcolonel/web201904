/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-15 17:56:09
 */
import React, { Component } from 'react'
import { Layout } from 'antd';
const { Content } = Layout;

import Header from 'common/header'
import Sider from 'common/sider'

import "./index.css"

class AdminLayout extends Component {
    render() {
        return (
            <div className="AdminLayout">
             <Layout>
                <Header />
                <Layout>
                <Sider />
                  <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                      style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                      }}
                    >
                      {this.props.children}
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
            </div>
        );
    }
}


export default AdminLayout