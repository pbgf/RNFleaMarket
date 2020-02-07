import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet
} from 'react-native'
import CommentItem from '../items/commentItem'
import api from '../../api'

export default function (props) {
    const { userInfo, navigation } = props
    console.log(navigation.getParam('communicationId'))
    useEffect(() => {
        api.comment.queryByCm()
    },[])
    return (
        <View style={styles.container}>
            <View>
                <Image />
                <Text></Text>
            </View>
            <View>
                <FlatList 
                style={{width:'100%'}}
                data={lists}
                renderItem={ ({item}) => 
                    <CommentItem
                        publishUser={item.user} 
                        publishTime={item.publishTime} 
                        img={item.img?item.img:''}
                        text={item.text}
                        navigation={props.navigation}
                        />
                }
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{

    }
})
