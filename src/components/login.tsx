import React, {useState, useEffect, useRef} from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native'
import MyButton from './button/myButton'
import api from '../api/index'
import Toast from '../components/base/Toast'
import md5 from 'js-md5'
import { NavigationScreenProp } from 'react-navigation'

export interface Props {
    saveUser: Function,
    navigation: NavigationScreenProp<any>
}

export default (props: Props) => {
    const [telePhone_val,OnChangeTelePhone] = useState('')
    const [passwd_val, onChangePasswd] = useState('')
    const { saveUser } = props
    const toast_ref = global.toast_ref
    const login = () => {
        // props.navigation.navigate('Tab')
        // console.profile('logining')
        if(telePhone_val&&passwd_val){
            const user = {
                telePhone_val,
                passwd_val: md5(passwd_val)
            }
            api.user.login(user)
            .then(res => res.json())
            .then(response => {
                if(response.status == 200) {
                    toast_ref.current.show(response.msg,() => {
                        saveUser(response.result[0])
                        props.navigation.navigate('Tab')
                    })
                }else{
                    toast_ref.current.show(response.msg)
                }
            })
        }else{
            toast_ref.current.show('请填写账号和密码')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>欢迎来到校园跳蚤市场，请登录</Text>
            </View>
            <View style={styles.content}>
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text => OnChangeTelePhone(text)}
                    placeholder='请输入电话号码'
                    value={telePhone_val} />
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text => onChangePasswd(text)}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholder='请输入密码'
                    secureTextEntry={true}
                    value={passwd_val} />
                <MyButton 
                    backgroundColor="#e20000" 
                    title="登录" 
                    isRadius={true}
                    onPress={login} width="70%"/>
                <MyButton 
                    backgroundColor="#e20000" 
                    title="注册" 
                    isRadius={true}
                    onPress={()=>{props.navigation.navigate('Register')}} width="70%"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.8,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:200,
    },
    content:{
        width:'100%',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        width:'70%'
    },
    button:{
        width:100
    }
})
