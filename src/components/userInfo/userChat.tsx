import React, {useState, useEffect, useRef, RefObject} from 'react'

import api from '../../api/'
import MyListView, {MyListViewApi} from '../base/myListView'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import ChatSimpleItem from '../items/chatSimpleItem'

export interface Props {
    navigation: NavigationScreenProp<NavigationState>,
    user: UserState
}

export default (props: Props) => {
    const [list, setList] = useState([])
    const ref = useRef<MyListViewApi>(null)
    const { user, navigation } = props
    const getList = () => {
        console.log(user)
        ref?.current?.refresh(user.Id)
    }
    useEffect(() => {
        getList()
    },[])
    return (
        <MyListView ref={ref} 
            renderItem={({item}) => 
                <ChatSimpleItem 
                item={(item as any)} 
                navigation={navigation} 
                dele={(Id) => {
                    api.chat.dele(Id)
                    .then(res => res.json())
                    .then(res => {
                        if(res.status == 200){
                            global.toast_ref.current.show('删除成功')
                            getList()
                        }
                    })
                }} />
            } 
            fetch={api.chat.queryByUserId} 
            keyExtractor={(item) => item.Id}  />
    )
}
