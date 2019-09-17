/*
 * @Author: TomChen
 * @Date:   2019-08-09 15:14:36
 * @Last Modified by:   TomChen
 * @Last Modified time: 2019-08-28 17:07:00
 */
import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;


import "./index.css"

class AdminSider extends Component {
    render() {
        return (
          <div className="AdminSider">
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  style={{ minHeight: 780, borderRight: 0 }}
                >
                    <Menu.Item key="1">
                      <NavLink exact to="/"><Icon type="home" />首页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <NavLink to="/user"><Icon type="user" />用户管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <NavLink to="/category"><Icon type="unordered-list" />分类管理</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <NavLink to="/product"><Icon type="shopping" />商品管理</NavLink>
                    </Menu.Item> 
                    <Menu.Item key="5">
                      <NavLink to="/order"><Icon type="dollar" />订单管理</NavLink>
                    </Menu.Item>                      
                    <Menu.Item key="6">
                      <NavLink to="/ad"><Icon type="fund" />广告管理</NavLink>
                    </Menu.Item>                                                              
                </Menu>
              </Sider>
          </div>
        );
    }
}


export default AdminSider