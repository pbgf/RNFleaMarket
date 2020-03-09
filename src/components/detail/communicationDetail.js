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

let myHeight
export default function (props) {
    const { userInfo, navigation } = props
    const [lists,setLists] = useState([])
    const [content,setContent] = useState({
        text:'',
        img:''
    })
    const publish = () => {
        console.log('publish')
    }
    const jumpToEditPage = () => {
        navigation.navigate('EditInput',{
            publish:publish,
            hasTitle:true
        })
    }
    const communicationId = navigation.getParam('communicationId')
    useEffect(() => {
        api.comment.queryByCm(communicationId)
        .then(res => res.json())
        .then(response => {
            setLists(response.result)
        })
        api.chat.query(`Id=${communicationId}`)
        .then(res => res.json())
        .then(response => {
            let result = response.result[0]
            let width = result.img.width
            let height = result.img.height
            myHeight = Math.floor(screenWidth/width*height)
            setContent({
                text:result.text,
                img:result.img.url
            })
        })
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{width:'100%',height:myHeight}} source={{uri:content.img}} />
                <Text>{content.text}</Text>
            </View>
            <ScrollView style={styles.comments}>
                <View style={{width:'100%'}}>
                    <FlatList 
                    style={{width:'100%'}}
                    data={lists}
                    renderItem={ ({item}) => <CommentItem item={item}/>}
                    keyExtractor={ (item) => item.Id}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.input} activeOpacity={0.7} onPress={jumpToEditPage}>
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
