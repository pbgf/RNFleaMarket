import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker'
import { NavigationScreenProp } from 'react-navigation'

interface ImgItemProps{
    source:string,
    onPress:() => void
}

function ImgItem (props:ImgItemProps) {
    const { source, onPress } = props
    return (
        <View style={{position:'relative',width:100,height:100}}>
            <TouchableOpacity onPress={onPress} style={{zIndex:999,width:20,height:20,position:'absolute',top:-5,right:-5}}>
                <Image 
                source={{uri:'xx'}}
                style={{width:20,height:20}} />
            </TouchableOpacity>
            <Image 
            source={{uri:source}}
            style={{width:100,height:100}} />
        </View>
    )
}

export interface Props{
    navigation:NavigationScreenProp<any>
}

export default function (props:Props) {
    const [isChosed,setIsChosed] = useState(false)
    const [path,setPath] = useState('')
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const toast_ref = global.toast_ref
    const { navigation } = props
    const hasTitle = navigation.getParam('hasTitle')
    const publish = navigation.getParam('publish')
    const choseImg = () => {
        ImagePicker.openPicker({}).then((value:ImageType | ImageType[]) => {
            value = value as ImageType
            setPath(value.path)
            setIsChosed(true)
        })
    }
    const close = () => {
        setPath('')
        setIsChosed(false)
    }
    const _publish = () => {
        if(hasTitle){
            if(title&&content){
                publish && publish()
            }else{
                toast_ref.current.show('请填写标题和内容')
            }
        }else if(content){
            publish && publish()
        }else{
            toast_ref.current.show('请填写内容')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TextInput 
                style={[styles.titleInput,styles.textInput,hasTitle?null:styles.disabled]} 
                underlineColorAndroid={'#b7b6b6'}
                editable={hasTitle?true:false}
                placeholder='这里添加标题'
                maxLength={10}
                value={title}
                onChangeText={text => setTitle(text)} />
            </View>
            <View style={styles.content}>
                <TextInput 
                style={[styles.contentInput,styles.textInput]} 
                numberOfLines={20} 
                multiline={true}
                placeholder='这里添加文字，请忽发布色情、政治等违反国家法律的内容'
                maxLength={1000}
                value={content}
                onChangeText={text => setContent(text)} />
            </View>
            <View style={styles.footer}>
                <View style={styles.items}>
                    {isChosed?<ImgItem source={path} onPress={close} />:null}
                </View>
                <View style={styles.toolBar}>
                    <TouchableOpacity style={styles.imgBtn} onPress={choseImg}>
                        <Image style={styles.imgIcon} source={{uri:'image'}} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={_publish}
                        >
                        <Text>发布</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        display:'flex',
        width:'100%',
        backgroundColor:'white'
    },
    textInput:{
        padding:5
    },
    title:{
        width:'100%',
        height:50,
        alignItems:'center'
    },
    titleInput:{
        width:'100%',
        height:50
    },
    disabled:{
        display:'none'
    },
    content:{
        width:'100%',
        alignItems:'center'
    },
    contentInput:{
        width:'100%',
        textAlignVertical: 'top',
        height:300
    },
    footer:{
        position:'absolute',
        bottom:0,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height:200,
        width:'100%'
    },
    items:{
        width:'100%',
        height:150
    },
    toolBar:{
        height:50,
        width:'100%',
        borderTopColor:'rgba(0, 0, 0, 0.3)',
        borderTopWidth:0.5,
        justifyContent:'center',
        flexDirection:'row'
    },
    imgIcon:{
        width:40,
        height:40
    },
    imgBtn:{
        width:'15%',
        borderRightWidth:0.5,
        borderRightColor:'rgba(0, 0, 0, 0.3)',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        width:'85%',
		height: 50,
		justifyContent: 'center', 
        alignItems: 'center', 
	}
})
