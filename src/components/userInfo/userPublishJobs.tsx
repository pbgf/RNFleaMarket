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
import JobItem from '../items/jobItem'

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
    useEffect(() => {
        getList()
    },[])
    return (
        <MyListView ref={ref} 
            renderItem={({item}) => 
                <JobItem 
                item={(item as any)} 
                navigation={navigation} 
                controlable={true} 
                dele={(Id) => {
                    api.job.dele(Id)
                    .then(res => res.json())
                    .then(res => {
                        if(res.status == 200){
                            global.toast_ref.current.show('删除成功')
                            getList()
                        }
                    })
                }} />
            } 
            fetch={api.job.queryByUserId} 
            keyExtractor={(item) => item.Id}  />
    )
}
