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
import { isnullOrUndefined, _get } from '../../common/'

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
export interface Field{
    placeholder:string,
    key:string
}
export interface Props{
    navigation:NavigationScreenProp<any>,
}
/**
 * 
 * @param props fields:Array<field>
 * data:object
 * field
 */
export default function (props:Props) {
    const [isChosed,setIsChosed] = useState(false)
    const [img,setImg] = useState<ImageType | null>(null)
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const toast_ref = global.toast_ref
    const { navigation } = props
    const fields:Array<Field> = navigation.getParam('fields')
    const [state,setState] = useState(navigation.getParam('initdata'))
    const publish:(content:string, state:any, img:ImageType|null, navigation:NavigationScreenProp<any>) => void = navigation.getParam('publish')
    const choseImg = () => {
        ImagePicker.openPicker({}).then((value:ImageType | ImageType[]) => {
            value = value as ImageType
            setImg(value)
            setIsChosed(true)
        })
    }
    const close = () => {
        setImg(null)
        setIsChosed(false)
    }
    const _publish = () => {
        let flag = 1
        Object.keys(state).forEach((key) => {
            if(isnullOrUndefined(state[key])){
                toast_ref.current.show('请填写内容完整')
                flag = 0
            }
        })
        if(flag){
            publish(content, state, img, navigation)
        }
        // if(hasTitle){
        //     if(title&&content){
        //         publish && publish()
        //     }else{
        //         toast_ref.current.show('请填写标题和内容')
        //     }
        // }else if(content){
        //     publish && publish()
        // }else{
        //     toast_ref.current.show('请填写内容')
        // }
    }
    return (
        <View style={styles.container}>
            {
                fields.map((item) => (
                    <View style={styles.title} key={item.key}>
                        <TextInput 
                        style={[styles.titleInput,styles.textInput]} 
                        underlineColorAndroid={'#b7b6b6'}
                        // editable={hasTitle?true:false}
                        placeholder={item.placeholder}
                        maxLength={10}
                        value={state[item.key]}
                        onChangeText={text => setState(Object.assign({},state,{
                            [item.key]: text
                        }))} />
                    </View>)
                )
            }
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
                    {isChosed?<ImgItem source={_get(img, 'path', '')} onPress={close} />:null}
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
