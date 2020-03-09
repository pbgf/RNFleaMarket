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
import { Item } from '../screen/jobsScreen'

export interface Props{
    navigation:NavigationScreenProp<any>
}

export default function (props:Props) {
    const { navigation } = props
    const [data,setData] = useState<Item>({
        Id:"",
        job_name:"",
        job_pay:"",
        job_detail:"",
        publish_time:"",
        publish_user:""
    })
    useEffect(()=>{
        api.job.query('id='+navigation.getParam('jobId'))
        .then(res => res.json())
        .then(response => {
            setData(response.result[0])
        })
    },[])
    const jumpToQQ = () => {
        Linking.canOpenURL('mqqapi://card/show_pslcard?src_type=internal&version=1&uin=596873301').then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL('mqqapi://card/show_pslcard?src_type=internal&version=1&uin=596873301')
            } else {
                console.warn('cuo wu')
            }
        })
    } 
    return (
        <View style={{width:'100%',height:'100%'}}>
            <JobItem navigation={navigation} item={data} />
            <Text style={{padding:10}}>详情：{data.job_detail}</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={jumpToQQ}>
                <Text>联系Ta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        position:'absolute',
        bottom:0,
        width:'100%',
        borderTopColor:'rgba(0, 0, 0, 0.3)',
        borderTopWidth:0.5,
        backgroundColor:'#fff',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
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