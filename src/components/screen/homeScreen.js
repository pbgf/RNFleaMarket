import React, { useState, useEffect, Component }  from 'react';
import { 
    Text, 
    View, 
    Button,
    FlatList
 } from 'react-native';
import CommunicationItemContainer from '../../containers/CommunicationItemContainer'

export default function HomeScreen (props) {
    const [lists,updateLists] = useState([
        {
            user:{
                icon:'',
                user_name:'hyq'
            },
            text:'测试文本，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈测试文本，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            img:{
                url:'http://pic1.win4000.com/wallpaper/2019-12-03/5de5ee3fd5fc2.jpg',
                width:'1920',
                height:'1200'
            },
            publishTime:'2020-01-26',
            title:'test',
            key:'1',
            like_cnt:1000,
            comment_cnt:1,
            Id:'f26a93834d86445eb323e91cae42f309'
        },
        {
            user:{
                icon:'',
                user_name:'test'
            },
            text:'用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。',
            img:{
                url:'http://attach.bbs.miui.com/forum/201202/18/090658g5shfjyixlhwjyyi.jpg',
                width:'1920',
                height:'1200'
            },
            publishTime:'2020-01-26',
            key:'2',
            like_cnt:1000,
            comment_cnt:1
        },
        {
            user:{
                icon:'',
                user_name:'hhhh'
            },
            text:'React Native可以通过Image组件显示图片。既可以加载网络图片,也可以加载本地资源图片。接下来，我们介绍React Native加载图片的几种方式',
            img:{
                url:'http://pic1.win4000.com/wallpaper/2019-11-27/5dde26e45b469.jpg',
                width:'1920',
                height:'1200'
            },
            publishTime:'2020-01-26',
            key:'3',
            like_cnt:1000,
            comment_cnt:1
        },
    ]) 
    return (
    <View style={{ flex: 1, width:'100%', justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
            style={{width:'100%'}}
            data={lists}
            renderItem={ ({item}) => 
                <CommunicationItemContainer
                    item={item}
                    navigation={props.navigation}
                    />
            }
        ></FlatList>
    </View>
    );
}
