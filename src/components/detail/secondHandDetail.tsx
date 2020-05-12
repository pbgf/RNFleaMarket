import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native'
// import FastImage from 'react-native-fast-image'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import api from '../../api/'
import SecondHandItem from '../items/secondHandItem'
import CommentItem from '../items/commentItem'
import { SecondHandState } from '../../store/reducers/secondHand'
import { CommentBeautify } from '../../store/reducers/comment'
import { UserState } from '../../store/reducers/user'
import { getFile, _get, autoAlert } from '../../common/'
import { height, width as screenWidth } from '../../config/device'

export interface Props{
    navigation:NavigationScreenProp<NavigationState>,
    userInfo: UserState
}

export default function (props:Props) {
    const { navigation, userInfo } = props
    const [data,setData] = useState<SecondHandState>({
        Id: '',
        detail: ''
    })
    const [publish_user,setUser] = useState<UserState>({
        Id: ''
    })
    const [lists,setLists] = useState([])
    const getList = () => {
        let userId:string
        api.comment.queryByCm(navigation.getParam('secondHandId'))
        .then(res => res.json())
        .then(response => {
            setLists(response.result)
        })
        new Promise((resolve) => {
            api.secondHand.query('id', navigation.getParam('secondHandId'))
            .then(res => res.json())
            .then(response => {
                setData(response.result[0])
                userId = response.result[0].publish_user
                resolve()
            })
        }).then(() => {
            api.user.query('Id', userId)
            .then(res => res.json())
            .then(response => {
                setUser(response.result[0])
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(()=>{
        getList()
    },[])
    const jumpToQQ = () => {
        Linking.canOpenURL(`mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${publish_user.qq}`).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(`mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${publish_user.qq}`)
            } else {
                global.toast_ref.current.show('出现了错误，请检查是否下载或登录QQ')
                console.warn('error')
            }
        })
    } 
    const jumpToTel = () => {
        Linking.canOpenURL(`tel://${publish_user.telephone}`).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(`tel://${publish_user.telephone}`)
            } else {
                global.toast_ref.current.show('出现了错误')
                console.warn('error')
            }
        })
    }
    const jumpToUserPage = (user: UserState) => {
        navigation.navigate('UserInfo', {
            user,
            isEditable: false
        })
    }
    const jumpToEditPage = (replay_user?: UserState | undefined) => () => {
        const initdata = {
        }
        const fields:Array<any> = []
        const publish = (content:string, fieldData:any, img={}, _navigation:NavigationScreenProp<NavigationState>) => {
            let comment = Object.assign(fieldData,{
                publish_user: userInfo.Id,
                publish_user_name: userInfo.user_name,
                chat_id: navigation.getParam('secondHandId'),
                content
            })
            Object.assign(fieldData,{
                reply_user: data.publish_user
            })
            if(replay_user){
                comment = Object.assign(fieldData,{
                    reply_user_name: replay_user.user_name,
                    reply_user: replay_user.Id
                })
            }else{
                comment = Object.assign(fieldData,{
                    reply_user_name: data.user_name,
                    reply_user: data.publish_user
                })
            }
            return api.comment.add(comment, '3')
            .then(res => res.json())
            .then(response => {
                autoAlert(() => {
                    return '发表了评论'
                }, () => {
                    if(response.status!=200){
                        return response.msg
                    }
                })
            }).then(() => {
                _navigation.goBack()
                getList()
            })
        }
        navigation.navigate('EditInput',{
            initdata,
            fields,
            publish,
        })
    }
    return (
        <View style={{width:'100%',height:'100%'}}>
            <View style={{width:'100%', backgroundColor:'#fff',position: 'relative'}}>
                <SecondHandItem navigation={navigation} item={data} />
                <TouchableOpacity activeOpacity={0.7} style={styles.buy_button} onPress={() => {
                    navigation.navigate('OrderSubmit', {
                        data
                    })
                }}>
                    <Text style={{color:'white'}}> 立即购买 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <ScrollView style={{width: '100%'}}>
                    <View style={styles.body}>
                        <Text>详情：{data.detail}</Text>
                        {
                            data.imgList?.map(({width,url,height}) => (
                                url?<Image 
                                    key={url} 
                                    style={{width:'100%', marginTop:5 ,height:Math.floor(screenWidth/Number(width)*Number(height))}} 
                                    source={{uri: getFile(url)}} />:null
                            ))
                        }
                    </View>
                    <View style={styles.comment}>
                        <Text style={styles.commentTitle}>留言</Text>
                        <View style={styles.comments}>
                            {
                                lists.length===0?(
                                    <View style={{alignItems:'center', marginBottom: 10}}>
                                        <Image style={{width: '40%', height: 150}} source={{uri: 'empty_comment'}} />
                                        <Text style={{color: '#999aaa', fontSize: 12}}>还没有人留言，赶快来留言吧</Text>
                                    </View>
                                ):<FlatList 
                                style={{width:'100%'}}
                                data={lists}
                                renderItem={ ({item}) => 
                                    <TouchableOpacity activeOpacity={0.7} onPress={jumpToEditPage(item.user)}>
                                        <CommentItem
                                            onPressUser={() => {
                                                if(item.user) jumpToUserPage(item.user)
                                                else global.toast_ref.current.show('用户不存在')
                                            }}
                                            onPressContent={jumpToEditPage(item.user)} item={item}/>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item:CommentBeautify) => _get(item, 'Id')}/>
                            }
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.input} activeOpacity={0.7} onPress={jumpToEditPage()}>
                                <Text>说点什么.....</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
               
            </View>
           
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={jumpToQQ}>
                <Text>QQ聊一聊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.transform]} activeOpacity={0.7} onPress={jumpToTel}>
                <Text>联系Ta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        position:'absolute',
        bottom:0,
        width:'50%',
        borderTopColor:'rgba(0, 0, 0, 0.3)',
        borderTopWidth:0.5,
        backgroundColor:'#fff',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    buy_button:{
        position: 'absolute',
        right: 10,
        top:10,
        padding:10,
        backgroundColor: '#ff2d55',
        alignItems:'center',
        justifyContent: 'center'
    },
    transform: {
        left: '50%',
        borderLeftColor: 'rgba(0, 0, 0, 0.3)',
        borderLeftWidth:0.5,
    },
    header: {
        width: '100%',
        marginBottom:10,
        padding:10,
        backgroundColor:'#fff',
    },
    content: {
        position: 'relative',
        width: '100%',
        height: height-220,
    },
    comment: {
        backgroundColor:'#fff',
        marginTop: 10
    },
    commentTitle: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: 10
    },
    comments: {
        width: '100%',
    },
    body: {
        backgroundColor:'#fff',
        paddingHorizontal:10
    },
    footer:{
        width:'100%',
        borderTopColor:'rgba(0, 0, 0, 0.3)',
        borderTopWidth:0.5,
        backgroundColor:'#fff',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        borderRadius:30,
        width:'90%',
        height:40,
        padding:10,
        backgroundColor:'rgba(0, 0, 0, 0.1)',
        justifyContent:'center',
    }
    // input:{
    //     borderRadius:30,
    //     width:'90%',
    //     height:40,
    //     padding:10,
    //     backgroundColor:'rgba(0, 0, 0, 0.1)',
    //     justifyContent:'center',
    //     alignItems:'center'
    // },

})