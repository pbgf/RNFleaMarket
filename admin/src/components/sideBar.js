import React, { useEffect, useState } from 'react'
import { Link } from 'dva/router'
import { Menu } from 'antd'
import {
    HomeOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import menus from '../config/menuConfig'

const { SubMenu } = Menu;

export default () => {
    const [selectedKeys,setKeys] = useState([])
    useEffect(() => {
        let url = window.location.hash.substr(1, window.location.hash.length)
        menus.forEach(menu => {
            if(menu.path == url){
                setKeys([menu.key])
            }
        })
        if(url == '/app'){
            setKeys(['0'])
        }
    },[window.location.hash])
    return (
        <Menu
            // onClick={handleClick}
            // style={{ width: 256 }}
            selectedKeys={selectedKeys}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
        >
            <Menu.Item key={0}>
                <Link to={'/app'}><HomeOutlined /><span>首页</span></Link>
            </Menu.Item>
            <SubMenu key='sub1' title={<span><SettingOutlined />系统管理</span>}>
                {
                    menus.map(menu => (
                        <Menu.Item key={menu.key}>
                            {menu.icon}
                            <Link to={menu.path}><span>{menu.title}</span></Link>
                        </Menu.Item>
                    ))
                }
                {/* <Menu.Item>
                    <UserOutlined />
                    <Link to={'/app/userManage'}><span>用户管理</span></Link>
                </Menu.Item>
                <Menu.Item>
                    <CommentOutlined />
                    <Link to={'/app/chatManage'}><span>帖子管理</span></Link>
                </Menu.Item>
                <Menu.Item>
                    <PaperClipOutlined />
                    <Link to={'/login'}><span>招聘管理</span></Link>
                </Menu.Item>
                <Menu.Item>
                    <TagOutlined />
                    <Link to={'/login'}><span>二手转让管理</span></Link>
                </Menu.Item> */}
            </SubMenu>
        </Menu>
    )
}