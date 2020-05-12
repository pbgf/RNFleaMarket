import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import CommentItem from '../items/commentItem'
import api from '../../api'
import { width as screenWidth } from '../../config/device'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import { CommentBeautify } from '../../store/reducers/comment'
import { User } from '../../store/reducers/chat'
import { _get, autoAlert, getFile } from '../../common/'
import { height } from '../../config/device'

export interface Props {
    navigation: NavigationScreenProp<NavigationState>,
    userInfo: UserState
}

let myHeight: number
export default function (props: Props) {
    const { userInfo, navigation } = props
    const [lists,setLists] = useState([])
    const [data,setData] = useState({
        text:'',
        img:'',
        user_name:'',
        user_id: ''
    })
    const communicationId = navigation.getParam('communicationId')
    const getList = () => {
        api.comment.queryByCm(communicationId)
        .then(res => res.json())
        .then(response => {
            setLists(response.result)
        })
        api.chat.query('Id', communicationId)
        .then(res => res.json())
        .then(response => {
            let result = response.result[0]
            let width = result.img.width || 0
            let height = result.img.height || 0
            height&&width&& (myHeight = Math.floor(screenWidth/width*height))
            setData({
                user_name: result.user_name,
                user_id: result.publish_user,
                text: result.text,
                img: result.img.url && getFile(result.img.url)
            })
        })
    }
    const jumpToUserPage = (user: UserState) => {
        navigation.navigate('UserInfo', {
            user,
            isEditable: false
        })
    }
    const jumpToEditPage = (type:string, replay_user?: UserState | undefined) => () => {
        const initdata = {
        }
        const fields:Array<any> = []
        const publish = (content:string, fieldData:any, img={}, _navigation:NavigationScreenProp<NavigationState>) => {
            let comment = Object.assign(fieldData,{
                publish_user: userInfo.Id,
                publish_user_name: userInfo.user_name,
                chat_id: navigation.getParam('communicationId'),
                content
            })
            if(replay_user){
                comment = Object.assign(fieldData,{
                    reply_user_name: replay_user.user_name,
                    reply_user: replay_user.Id
                })
            }else{
                comment = Object.assign(fieldData,{
                    reply_user_name: data.user_name,
                    reply_user: data.user_id
                })
            }
            return api.comment.add(comment, type)
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
    
    useEffect(() => {
        getList()
    },[])
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image style={{width:'100%',height:myHeight}} source={{uri:data.img}} />
                    <Text>{data.text}</Text>
                </View>
                <ScrollView style={styles.comments}>
                    <FlatList 
                        style={{width:'100%'}}
                        data={lists}
                        renderItem={ ({item}) => 
                            <TouchableOpacity activeOpacity={0.7} onPress={jumpToEditPage('1', item.user)}>
                                <CommentItem
                                    onPressUser={() => {
                                        if(item.user) jumpToUserPage(item.user)
                                        else global.toast_ref.current.show('用户不存在')
                                    }}
                                    onPressContent={jumpToEditPage('1', item.user)} item={item}/>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item:CommentBeautify) => _get(item, 'Id')}
                    />
                </ScrollView>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.input} activeOpacity={0.7} onPress={jumpToEditPage('2')}>
                    <Text>说点什么.....</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex:1
    },
    header: {
        width: '100%',
        marginBottom:10,
        padding:10,
        backgroundColor:'#fff',
    },
    comments: {
        width: '100%',
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
})
