import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { UserState } from '../../store/reducers/user'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { CommentState } from '../../store/reducers/comment'
import { ChatState } from '../../store/reducers/chat'

export interface MessageState {
    Id:string,
    publish_user_name?:string,
    reply_user_name?:string,
    type?:string,
    message_user_id?:string,
    chat_id:string,
    comment_id:string,
    comment?:CommentState,
    chat?: ChatState
}

export interface Props{
    item: MessageState,
    navigation:NavigationScreenProp<NavigationState>
}

export default function (props:Props) {
    const { navigation } = props
    const { Id, publish_user_name, comment, chat_id, chat, type } = props.item
    const _onPress = () => {
        console.log(chat_id)
        switch(type){
            case '1':
            case '2':
                navigation.navigate('CommunicationDetail',{
                    communicationId: chat_id,
                    title: chat?.title
                })
                break;
            case '3':
                navigation.navigate('SecondHandDetail',{
                    secondHandId: chat_id,
                })
                break;
            case '4':
                navigation.navigate('JobDetail',{
                    jobId: chat_id,
                })
                break;
        }
        
    }
    return (
        <TouchableOpacity
        onPress={_onPress}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{fontWeight: 'bold'}}>{publish_user_name}</Text>
                    <Text style={{fontSize: 14, color: '#505050'}}>{type==='3'?'给我留了言':'回复了我的'+ (type==='1'?'评论':type==='2'?'帖子':'')}</Text>
                </View>
                <Text>{comment?.content}</Text>
                <Text style={{fontSize: 10, color: '#333'}}>{comment?.publish_time}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:10,
        borderBottomColor:'rgba(0, 0, 0, 0.3)',
        borderBottomWidth:1
    },
    title:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content:{

    },
})
