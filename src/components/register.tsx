import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    Modal,
    Image,
    TextInput,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native'
import MyButton from './button/myButton'
import api from '../api/index'
import ImagePicker from 'react-native-image-crop-picker'
import { guid, autoAlert } from '../common'
import md5 from 'js-md5'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { Image as ImageType } from 'react-native-image-crop-picker'

export interface Props{
    navigation: NavigationScreenProp<NavigationState>
}

const Register = (props: Props) => {
    const [telePhone_val,OnChangeTelePhone] = useState('')
    const [QQTel_val,onChangeQQTel] = useState('')
    const [userName_val,onChangeUserName] = useState('')
    const [passwd_val,onChangePasswd] = useState('')
    const [isUpload,onChangeIsUpload] = useState(false)
    const [modalVisible, setVisible] = useState(false)
    const toast_ref = global.toast_ref
    //const toast_com = toast_ref.current;
    const [imgPath,onChangeImgPath] = useState('')
    const [formData,setFormData] = useState(new FormData()) 
    let file
    const choseImg = () => {
        ImagePicker.openPicker({
            cropping: true,
            width: 300,
            height: 300,
            multiple: false
        }).then((image: ImageType | Array<ImageType>) => {
            image = (image as ImageType)
            file = { uri:image.path, type:image.mime, size:image.size, name: guid() }
            formData.append('file', file)
            onChangeIsUpload(true)
            onChangeImgPath(image.path)
        })
    }
    const isNumber = (value:any) => {
        return !isNaN(value/1)
    }
    const isEmpty = () => {
        return telePhone_val && QQTel_val && userName_val && passwd_val && isUpload
    }
    const registerHandler = () => {
        if(isEmpty()){
            setVisible(true)
            formData.append('telephone', telePhone_val)
            formData.append('qq', QQTel_val)
            formData.append('user_name', userName_val)
            formData.append('pass_word', md5(passwd_val))
            api.user.register(formData)
            .then(res => res.json())
            .then(response => {
                autoAlert(() => {
                    setVisible(false)
                    return '注册成功'
                }, () => {
                    setVisible(false)
                    if(response.status != 200){
                        return response.msg
                    }
                }).then(() => {
                    props.navigation.navigate('LoginContainer')
                })
                // if(response.status == 200){
                //     toast_ref.current.show('注册成功', () => {
                //         console.log('jump login')
                //         props.navigation.navigate('LoginContainer')
                //     })
                // }else{
                //     toast_ref.current.show(response.msg)
                // }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            toast_ref.current.show('请填写完所有信息')
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" style={{width:'100%',height:'80%'}}>
            <View style={styles.container}>
            <ImageBackground source={{uri:'cuitbeijing'}} style={styles.title}>
                <Text>校园跳蚤市场</Text>
            </ImageBackground>
            {/* <View style={styles.title}>
                <Text>校园跳蚤市场</Text>
            </View> */}
            <View style={styles.content}>
                <TouchableOpacity style={styles.button} onPress={choseImg}>
                    {
                        isUpload?
                        <Image
                        style={{width: 80, height: 80, borderRadius:40}}
                        source={{uri: imgPath}}/>
                        :<Image
                        style={{width: 60, height: 60}}
                        source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                        />
                    }
                </TouchableOpacity>
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text => {if(isNumber(text)) OnChangeTelePhone(text)}}
                    placeholder='电话'
                    value={telePhone_val} />
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text =>{if(isNumber(text)) onChangeQQTel(text)}}
                    placeholder='QQ号码'
                    value={QQTel_val} />
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text => onChangeUserName(text)}
                    placeholder='用户名'
                    value={userName_val} />
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text =>{if(isNumber(text)) onChangePasswd(text)}}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholder='密码'
                    secureTextEntry={true}
                    value={passwd_val} />
                <MyButton 
                    backgroundColor="#e20000" 
                    title="确定" 
                    isRadius={true}
                    onPress={()=>{registerHandler()}} width="70%"/>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ width:200,height:150 }}>
                        <ActivityIndicator size="large" color="#e20000"/>
                    </View>
                </View>
            </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        height:'100%',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        flex:0.45,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
        // padding:100
    },
    content:{
        flex:1,
        width:'100%',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        width:'70%'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor: '#DDDDDD',
        width: 80, 
        height: 80,
        borderRadius:50
      }
})
