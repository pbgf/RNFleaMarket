import React, { useEffect, useState } from 'react'
import { Link } from 'dva/router'
import { Menu } from 'antd'
import {
    HomeOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import menus from '../config/menuConfig';
import { connect } from 'dva'

const { SubMenu } = Menu;

function sideBar ({ userInfo }) {
    const [selectedKeys,setKeys] = useState([])
    const [permissMenu, setPermissMenu] = useState([])
    useEffect(() => {
        if(userInfo.user_name != 'admin'){
            setPermissMenu([])
        }else{
            setPermissMenu(menus)
        }
        function hashChangeHandler () {
            let url = window.location.hash.substr(1, window.location.hash.length)
            menus.forEach(menu => {
                if(menu.path == url){
                    setKeys([menu.key])
                }
            })
            
            if(url == '/app'){
                setKeys(['0'])
            }else if(url == '/app/deposit'){
                setKeys(['9'])
            }
        }
        hashChangeHandler()
        window.addEventListener('hashchange', hashChangeHandler)
        return function cleanup () {
            window.removeEventListener('hashchange', hashChangeHandler)
        }
    }, [])

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
            <Menu.Item key={9}>
                <Link to={'/app/deposit'}><HomeOutlined /><span>充值</span></Link>
            </Menu.Item>
            
            {/* <Menu.Item onClick={() => setKeys([-1])} key={-1}>
                <Link to={'/app'}><HomeOutlined /><span>充值</span></Link>
            </Menu.Item> */}
            {
                userInfo.user_name === 'admin'?(
                    <SubMenu key='sub1' title={<span><SettingOutlined />系统管理</span>}>
                        {
                            permissMenu.map(menu => (
                                <Menu.Item  key={menu.key}>
                                    {menu.icon}
                                    <Link to={menu.path}><span>{menu.title}</span></Link>
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                ):null
            }
        </Menu>
    )
}
export default connect(({user}) => ({
    userInfo: user
}))(sideBar)