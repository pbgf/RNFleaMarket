import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { ChatState } from '../../store/reducers/chat'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

export interface Props{
    item:ChatState,
    navigation:NavigationScreenProp<NavigationState>,
    dele?: (Id:string) => void
}

export default function (props:Props) {
    const { navigation, dele } = props
    const { Id, title, publish_user, text, publish_time } = props.item
    const _onPress = () => {
        navigation.navigate('CommunicationDetail', {
            communicationId: Id,
            title: title
        })
    }
    return (
        <TouchableOpacity style={styles.row} onPress={_onPress}>
            <View style={styles.container}>
                <Text style={styles.name}>{title}</Text>
                {/* <Text>{text}</Text> */}
                <Text>发布时间：{publish_time}</Text>
                <TouchableOpacity onPress={dele?dele.bind(null,Id):() => {}} style={{position:'absolute', right: 10, top: '50%'}}>
                    <Text style={{textDecorationLine: 'underline'}}>删除</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    deleBtn: {
        position:'absolute', 
        right: 10, 
        top: '50%'
    },
    container:{
        display:'flex',
        width:'100%',
        padding:10,
        justifyContent:'space-around',
        borderBottomColor:'rgba(0, 0, 0, 0.3)',
        borderBottomWidth:1
    },
    name:{
        fontSize:20
    },
})
