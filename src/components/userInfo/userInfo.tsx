import React, { useEffect, useState, useCallback } from 'react'
import {
    View,
    Text,
    Image,
    Picker,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { UserState } from '../../store/reducers/user'
import { width } from '../../config/device'
import ImagePicker from 'react-native-image-crop-picker'
import { Image as ImageType } from 'react-native-image-crop-picker'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { getFile, guid, autoAlert } from '../../common/'
import store from '../../store/index'
import { saveUserInfo } from '../../store/actions/'
import api from '../../api/'

export interface Props{
    navigation:NavigationScreenProp<NavigationState>
}

export default (props:Props ) => {
    const {navigation} = props
    const [isEditable] = useState(navigation.getParam('isEditable'))
    const [user,setUser] = useState<UserState>(navigation.getParam('user'))
    const [imgPath,changeImgPath] = useState(user.icon?getFile(user.icon):'' || 'default_header')
    const [formData] = useState(new FormData()) 
    let file
    const choseImg = useCallback(() => {
        ImagePicker.openPicker({
            cropping: true,
            width: 300,
            height: 300,
            multiple: false
        }).then((image: ImageType | Array<ImageType>) => {
            image = (image as ImageType)
            file = { uri:image.path, type:image.mime, size:image.size, name: guid() }
            formData.append('file', file)
            changeImgPath(image.path)
        })
    },[formData])
    const save = useCallback(() => {
        Object.keys(user).forEach(key => {
            formData.append(key, user[key])
        })
        api.user.updateUser(formData)
        .then(res => res.json())
        .then(response => {
            autoAlert(() => {
                return '保存成功'
            }, () => {
                if(response.status != 200){
                    return response.msg
                }
            })
        }).then((result) => {
            api.user.query('user_name', user.user_name)
            .then(res => res.json())
            .then(response => {
                if(response.result.length) store.dispatch(saveUserInfo(response.result[0]))
            })
            //store.dispatch(saveUserInfo())
        })
    },[user, formData])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    isEditable?
                        <TouchableOpacity style={styles.imgIcon} onPress={choseImg}>
                            <Image
                            style={{width: 80, height: 80, borderRadius:40}}
                            source={{uri: imgPath}}/>
                        </TouchableOpacity>
                    :<Image style={styles.userIcon} source={{uri: imgPath}}></Image>
                }
                {
                    isEditable?<Text>点击修改头像</Text>:null
                }
            </View>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Text>昵称:</Text>
                    <TextInput 
                    style={{width:'100%'}}
                    onChangeText={(text) => setUser(Object.assign({},user,{
                        user_name: text
                    }))} 
                    value={user.user_name} 
                    editable={isEditable} />
                </View>
                <View style={styles.item}>
                    <Text>性别:</Text>
                    <Picker
                        enabled={isEditable}
                        selectedValue={user.sex}
                        style={{height: 50, width:80}}
                        onValueChange={(itemValue, itemIndex) =>
                            setUser(Object.assign({},user,{
                                sex:itemValue
                            }))
                        }>
                        <Picker.Item label="男" value={1} />
                        <Picker.Item label="女" value={0} />
                    </Picker>
                </View>
                {
                    isEditable?(
                        <View style={styles.item}>
                            <Text>余额:</Text>
                            <TextInput value={String(user.money)} editable={false} />
                        </View>
                    ):null
                }
                <View style={styles.item}>
                    <Text>获赞:</Text>
                    <TextInput value={String(user.like_cnt)} editable={false} />
                </View>
            </View>
            {
                isEditable?
                <TouchableOpacity 
                    style={styles.button}
                    onPress={save}
                    >
                    <Text>保存</Text>
                </TouchableOpacity>:null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomWidth: 0.5,
        backgroundColor: 'white'
    },
    userIcon:{
        borderColor:'rgba(0, 0, 0, 0.3)',
        borderWidth: 0.5,
        borderRadius:999,
        width: 70,
        height:70,
      },
    content:{
        flex:4,
        marginTop: 20,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    item:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)'
    },
    button: {
		width,
		height: 50,
		position: 'absolute',
		bottom: 0,
		backgroundColor:'#fff',
		justifyContent: 'center', 
        alignItems: 'center', 
        borderTopWidth:0.5,
        borderTopColor: 'rgba(0, 0, 0, 0.3)'
    },
    imgIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor: '#DDDDDD',
        width: 80, 
        height: 80,
        borderRadius:50
    }
})
