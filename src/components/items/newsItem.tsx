import React, { useState } from 'react'
import {
    View,
    Text,
    Linking,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export interface Props {
    item:any,
    index:number
}

export default function (props:Props) {
    const {item, index} = props
    const openWeb = (url:string) => {
        Linking.canOpenURL(url).then(supported => { // weixin://  alipay://
                if (supported) {
                    Linking.openURL(url)
                } else {
                    global.toast_ref.current.show('出现了错误')
                    console.warn('error')
                }
            })
      }
    return (
        <TouchableOpacity style={styles.container} onPress={openWeb.bind(null,item.Url)}>
            <View style={styles.order}>
                <Text style={{color:index<3?'red':'#6d6d6d'}}>{index+1}</Text>
            </View>
            <View style={styles.title}>
                <Text style={{fontSize:15}}>{item.Title}</Text>
                <Text style={{marginTop: 20}}> {item.approvalNum}赞{item.commentNum}评论</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: 'rgba(100, 100, 100, 0.3)',
        borderTopWidth: 0.5
    },
    order:{
        width: '10%',
        alignItems: 'center'
    },
    title:{
        height: '100%',
        width: '90%',
        justifyContent: 'center',
    }
})