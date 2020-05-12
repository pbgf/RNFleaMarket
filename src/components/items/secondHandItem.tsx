import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { SecondHandState } from '../../store/reducers/secondHand'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

export interface Props{
    item:SecondHandState,
    navigation:NavigationScreenProp<NavigationState>,
    controlable?: boolean,
    dele?: (Id:string) => void
}

export default function (props:Props) {
    const { navigation, controlable, dele } = props
    const { Id, title, price, publish_user, user_name, publish_time } = props.item
    const _onPress = () => {
        navigation.navigate('SecondHandDetail',{
            secondHandId:Id
        })
    }
    return (
        <TouchableOpacity style={styles.row} onPress={_onPress}>
            <View style={styles.container}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.pay}>{price}</Text>
                <Text style={styles.userName}>发布者：{user_name}  发布时间：{publish_time}</Text>
                {
                    controlable&&dele?(
                        <TouchableOpacity onPress={dele.bind(null,Id)} style={{position:'absolute', right: 10, top: '50%'}}>
                            <Text>删除</Text>
                        </TouchableOpacity>
                    ):null
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 100
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
    pay:{
        fontSize:30,
        color:'#ea4335'
    },
    userName:{

    }
})
