import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import api from '../../api/'
import JobItem from '../items/jobItem'
import { JobState } from '../../store/reducers/job'
import { UserState } from '../../store/reducers/user'

export interface Props{
    navigation:NavigationScreenProp<any>
}

export default function (props:Props) {
    const { navigation } = props
    const [data,setData] = useState<JobState>({
        Id: ''
    })
    const [publish_user,setUser] = useState<UserState>({
        Id: ''
    })
    useEffect(()=>{
        let user_name:string
        new Promise((resolve) => {
            api.job.query('id', navigation.getParam('jobId'))
            .then(res => res.json())
            .then(response => {
                setData(response.result[0])
                user_name = response.result[0].publish_user
                resolve()
            })
        }).then(() => {
            api.user.query('user_name', user_name)
            .then(res => res.json())
            .then(response => {
                setUser(response.result[0])
            })
        }).catch((err) => {
            console.log(err)
        })
    },[])
    const jumpToQQ = () => {
        Linking.canOpenURL(`mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${publish_user.qq}`).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(`mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${publish_user.qq}`)
            } else {
                console.warn('error')
            }
        })
    } 
    const jumpToTel = () => {
        console.warn(publish_user)
        Linking.canOpenURL(`tel://${publish_user.telephone}`).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(`tel://${publish_user.telephone}`)
            } else {
                console.warn('error')
            }
        })
    }
    return (
        <View style={{width:'100%',height:'100%'}}>
            <JobItem navigation={navigation} item={data} />
            <Text style={{padding:10}}>详情：{data.job_detail}</Text>
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
    transform: {
        left: '50%',
        borderLeftColor: 'rgba(0, 0, 0, 0.3)',
        borderLeftWidth:0.5,
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