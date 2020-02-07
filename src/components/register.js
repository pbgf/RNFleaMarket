import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import MyButton from './button/myButton'
import api from '../api/index'
import Toast from '../components/base/Toast'
import ImagePicker from 'react-native-image-crop-picker'
import { guid } from '../common'
import md5 from 'js-md5'

const Register = (props) => {
    const [telePhone_val,OnChangeTelePhone] = useState('')
    const [QQTel_val,onChangeQQTel] = useState('')
    const [userName_val,onChangeUserName] = useState('')
    const [passwd_val,onChangePasswd] = useState('')
    const [isUpload,onChangeIsUpload] = useState(false)
    const toast_ref = useRef()
    //const toast_com = toast_ref.current;
    const [imgPath,onChangeImgPath] = useState('')
    const [formData,setFormData] = useState(new FormData()) 
    let file
    const choseImg = () => {
        ImagePicker.openPicker({
            cropping: true,
            width: 300,
            height: 300
          }).then(image => {
            file = { uri:image.path, type:image.mime, size:image.size, name: guid() }
            formData.append('file', file)
            onChangeIsUpload(true)
            onChangeImgPath(image.path)
          })
    }
    const isNumber = (value) => {
        return !isNaN(value/1)
    }
    const isEmpty = () => {
        return telePhone_val && QQTel_val && userName_val && passwd_val && isUpload
    }
    const registerHandler = () => {
        if(isEmpty){
            formData.append('telephone', telePhone_val)
            formData.append('qq', QQTel_val)
            formData.append('user_name', userName_val)
            formData.append('pass_word', md5(passwd_val))
            api.user.register(formData)
            .then(res => res.json())
            .then(response => {
                if(response.status == 200){
                    toast_ref.current.show('success', () => {
                        props.navigation.navigate('Login')
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            toast_ref.current.show('请填写完所有信息')
        }
    }

    return (
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
            <Toast ref={toast_ref} />
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:0.75,
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
