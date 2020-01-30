import React, { useState, useEffect, Component }  from 'react';
import { 
    Text, 
    View, 
    Button,
    FlatList
 } from 'react-native';
import CommunicationItem from '../items/communicationItem'

export default function HomeScreen (props) {
    const [lists,updateLists] = useState([
        {
            user:{
                userIcon:'',
                userName:'hyq'
            },
            text:'测试文本，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈测试文本，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            img:{
                url:'http://pic1.win4000.com/wallpaper/2019-12-03/5de5ee3fd5fc2.jpg',
                width:'1920',
                height:'1200'
            },
            publishTime:'2020-01-26',
            key:'1'
        },
        {
            user:{
                userIcon:'',
                userName:'test'
            },
            text:'用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。',
            img:{
                url:'http://attach.bbs.miui.com/forum/201202/18/090658g5shfjyixlhwjyyi.jpg',
                width:'1920',
                height:'1200'
            },
            publishTime:'2020-01-26',
            key:'2'
        },
        {
            user:{
                userIcon:'',
                userName:'hhhh'
            },
            text:'React Native可以通过Image组件显示图片。既可以加载网络图片,也可以加载本地资源图片。接下来，我们介绍React Native加载图片的几种方式',
            img:{
                url:'http://pic1.win4000.com/wallpaper/2019-11-27/5dde26e45b469.jpg',
                width:'1920',
                height:'1200'
            },
            publishTime:'2020-01-26',
            key:'3'
        },
    ]) 
    return (
    <View style={{ flex: 1, width:'100%', justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
            style={{width:'100%'}}
            data={lists}
            renderItem={ ({item}) => 
                <CommunicationItem 
                    user={item.user} 
                    publishTime={item.publishTime} 
                    img={item.img?item.img:''}
                    text={item.text}
                    navigation={props.navigation}
                     />
            }
        ></FlatList>
    </View>
    );
}
