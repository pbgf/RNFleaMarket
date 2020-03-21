import React, {useState, useEffect, useRef, RefObject} from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from 'react-native'
import api from '../../api/'
import MyListView, {MyListViewApi} from '../base/myListView'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import MessageItem, { MessageState } from '../../components/items/messageItem'

export interface Props {
    navigation: NavigationScreenProp<NavigationState>,
    user: UserState
}

export default (props: Props) => {
    const [list, setList] = useState([])
    const ref = useRef<MyListViewApi>(null)
    const { user, navigation } = props
    const getList = () => {
        ref?.current?.refresh(user.Id)
    }
    const _renderItem = () => {

    }
    useEffect(() => {
        getList()
    },[])
    return (
        <MyListView ref={ref} renderItem={(item) => <MessageItem item={(item as any)} navigation={navigation} />} fetch={api.message.queryParams} keyExtractor={(item) => item.Id}  />
    )
}

const styles = StyleSheet.create({
    container:{
       flex: 1
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
