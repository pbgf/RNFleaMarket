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

export default function communicationItmes(props) {
    const { user, text, img, publishTime } = props //只能发一张图片
    const { userIcon, userName } = user
    const { width, height, url } = img
    const [isLoad, setIsLoad] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [likeCnt,setLikeCnt] = useState(1000)
    const [commentCnt, setCommentCnt] = useState(0)
    const myHeight = Math.floor(screenWidth/width*height)
    Image.getSize(url,() => {
        setIsLoad(true)
    })
    useEffect(()=>{},[isLoad,isLike])
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
                    <Text>{userName}</Text>
                    <Text>{publishTime}</Text>
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
                {
                    <TouchableOpacity style={styles.iconContainer} activeOpacity={1} onPress={()=>{
                            setIsLike(!isLike)
                            if(!isLike){
                                setLikeCnt(likeCnt+1)
                            }else{
                                setLikeCnt(likeCnt-1)
                            }
                        }}>
                        {isLike?<Image style={styles.IconItem} source={{uri:'like_filled'}} />:<Image style={styles.IconItem} source={{uri:'like'}}/>}
                        <Text>{likeCnt}</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={()=>{props.navigation.navigate('Login')}}>
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
