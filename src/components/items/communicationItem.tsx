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

export interface Props {
    item: any,
    navigation: NavigationScreenProp<NavigationState>,
    userInfo: UserState
}

export default function communicationItem(props:Props) {
    const { user, text, img, publish_time, Id, title, like_cnt, comment_cnt } = props.item //只能发一张图片
    const { navigation, userInfo } = props
    const { icon, user_name } = user
    const { width, height, url } = img
    const [isLoad, setIsLoad] = useState(false)
    const [commentCnt, setCommentCnt] = useState(comment_cnt)
    const myHeight = Math.floor(screenWidth/width*height)
    Image.getSize(url,() => {
        setIsLoad(true)
    },(err) => {
        console.log(err)
    })
    const jumpToDetail = () => {
        navigation.navigate('CommunicationDetailContainer', {
            communicationId: Id,
            title: title
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
            <View style={styles.title}>
                <View style={styles.userImg}>
                    <Image style={styles.userIcon} source={{uri:'default_header'}}></Image>
                </View>
                <View style={styles.column}>
                    <Text>{user_name}</Text>
                    <Text>{publish_time}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text>{text}</Text>
                {
                    url ? (isLoad && (
                        <View style={styles.imgSlot}>
                            <FastImage 
                                style={{width:'100%',height:myHeight}} 
                                source={{uri:url}} />
                        </View>
                    )) ||  <ActivityIndicator size="large" color="#e20000"/> : <View />
                }
            </View>
            <View style={styles.bottomBar}>
                
                <Like likeCnt={like_cnt} />
                
                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={jumpToDetail}>
                    <Image style={styles.IconItem} source={{uri:'message'}} />
                    <Text>{commentCnt}</Text>
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
