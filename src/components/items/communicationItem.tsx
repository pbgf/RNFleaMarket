import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { width as screenWidth } from '../../config/device'
import FastImage from 'react-native-fast-image'
import IconItem from '../base/iconItem'
import Like from '../base/like'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import { ChatBeautify } from '../../store/reducers/chat'
import api, { base_path } from '../../api/'
import { getFile } from '../../common/'

export interface Props {
    item: ChatBeautify,
    navigation: NavigationScreenProp<NavigationState>,
    userInfo: UserState
}

export default function communicationItem(props:Props) {
    const { user, text, img, publish_time, Id, title, like_cnt, comment_cnt } = props.item //只能发一张图片
    const { navigation, userInfo } = props
    const [isLoad, setIsLoad] = useState(false)
    let { icon, user_name } = user || {}
    let { width, height, url } = img || {
        width: 0,
        height: 0,
        url: ''
    }
    const myHeight = Math.floor(screenWidth/Number(width)*Number(height))
    icon && (icon = `${base_path}/file/${icon}`)
    //处理服务器端的图片路径
    url = url && getFile(url)
    if(url){
        Image.getSize(url,() => {
            setIsLoad(true)
        },(err) => {
            console.log(err)
        })
    }
    const jumpToDetail = () => {
        navigation.navigate('CommunicationDetail', {
            communicationId: Id,
            title: title
        })
    }
    const jumpToUserPage = (user: UserState) => {
        navigation.navigate('UserInfo', {
            user,
            isEditable: false
        })
    }
    useEffect(()=>{},[isLoad])
    // const loadSuccess = () => {
    //     setIsLoad(!isLoad)
    // }
    // let [myHeight, setHeight] = useState(0)
    // useEffect(() => {
    //     Image.getSize(imgUrl,(width,height) => {
    //         //width 图片的宽度
    //         //height 图片的高度
    //         setHeight(Math.floor(screenWidth/width*height))
    //     },(err)=>{
    //         console.log(err)
    //     })
    // })
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => {
                    if(user) jumpToUserPage(user)
                    else global.toast_ref.current.show('用户不存在')
                }}
                style={styles.title}>
                <View style={styles.userImg}>
                    <Image style={styles.userIcon} source={{uri:(icon || 'default_header')}}></Image>
                </View>
                <View style={styles.column}>
                    <Text>{user_name}</Text>
                    <Text>{publish_time}</Text>
                </View>
            </TouchableOpacity>
            
            <View style={styles.content}>
                <Text>{text}</Text>
                {
                    url ? (isLoad && (
                        <View style={styles.imgSlot}>
                            <FastImage 
                                style={{width:'100%',height:myHeight}} 
                                source={{uri:url}} />
                        </View>
                    )) ||  <View style={{height:myHeight,justifyContent:'center'}}><ActivityIndicator size="large" color="#e20000"/></View> : <View />
                }
            </View>
            <View style={styles.bottomBar}>
                <Like 
                    likeCnt={Number(like_cnt)} 
                    minusCnt={(cnt) => api.chat.minusLikeCnt({like_cnt:cnt, Id, user_id:user?.Id})}
                    addCnt={(cnt) => api.chat.addLikeCnt({like_cnt:cnt, Id, user_id:user?.Id})} />
                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={jumpToDetail}>
                    <Image style={styles.IconItem} source={{uri:'message'}} />
                    <Text>{comment_cnt}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        borderBottomColor:'rgba(0, 0, 0, 0.3)',
        borderBottomWidth:1,
        paddingTop:15
    },
    column:{
        flex:1,
        flexDirection:'column'
    },
    userImg:{
        paddingLeft:20,
        paddingRight:20,
    },
    userIcon:{
        borderRadius:20,
        width:40,
        height:40,
    },
    title:{
        flex:1,
        flexDirection:'row',
        height:40,
    },
    content:{
        paddingTop:5,
        paddingLeft:10,
        paddingRight:10,
        width:'100%'
    },
    imgSlot:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    imgStyle:{
        width:'100%',
        height:'100%'
    },
    bottomBar:{
        paddingLeft:10,
        paddingRight:10,
        width:'100%',
        flex:1,
        flexDirection:'row'
    },
    iconContainer:{
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5
    },
    IconItem:{
        width:20,
        height:20,
        marginHorizontal:5,
    }
})
