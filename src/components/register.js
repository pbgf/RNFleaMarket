import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    StyleSheet
} from 'react-native'
import MyButton from './button/myButton'

const Register = (props) => {
    const [telePhone_val,OnChangeTelePhone] = useState('')
    const [QQTel_val,onChangeQQTel] = useState('')
    const [userName_val,onChangeUserName] = useState('')
    const [passwd_val,onChangePasswd] = useState('')
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri:'cuitbeijing'}} style={styles.title}>
                <Text>校园跳蚤市场</Text>
            </ImageBackground>
            {/* <View style={styles.title}>
                <Text>校园跳蚤市场</Text>
            </View> */}
            <View style={styles.content}>
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text => OnChangeTelePhone(text)}
                    placeholder='电话'
                    value={telePhone_val} />
                <TextInput 
                    style={styles.textInput}
                    underlineColorAndroid={'#b7b6b6'}
                    onChangeText={text => onChangeQQTel(text)}
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
                    onChangeText={text => onChangePasswd(text)}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholder='密码'
                    secureTextEntry={true}
                    value={passwd_val} />
                <MyButton 
                    backgroundColor="#e20000" 
                    title="确定" 
                    isRadius={true}
                    onPress={()=>{props.navigation.navigate('Login')}} width="70%"/>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:0.55,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        flex:0.6,
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
    }
})