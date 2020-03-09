import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Item } from '../screen/jobsScreen'
import { NavigationScreenProp } from 'react-navigation'

export interface Props{
    item:Item,
    navigation:NavigationScreenProp<any>
}

export default function (props:Props) {
    const { navigation } = props
    const { Id, job_name, job_pay, publish_user, publish_time } = props.item
    const _onPress = () => {
        navigation.navigate('JobDetail',{
            jobId:Id
        })
    }
    return (
        <TouchableOpacity onPress={_onPress}>
            <View style={styles.container}>
                <Text style={styles.name}>{job_name}</Text>
                <Text style={styles.pay}>{job_pay}</Text>
                <Text style={styles.userName}>发布者：{publish_user}  发布时间：{publish_time}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
