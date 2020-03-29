import React, {useState, useEffect, useRef, RefObject} from 'react'

import api from '../../api/'
import MyListView, {MyListViewApi} from '../base/myListView'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import CommentItem from '../items/commentItem'

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
    const _onPressContent = (id:string, title:string) => {
        navigation.navigate('CommunicationDetailContainer', {
            communicationId: id,
            title: title
        })
    }
    useEffect(() => {
        getList()
    },[])
    return (
        <MyListView ref={ref} 
            renderItem={({item}) => 
                <CommentItem 
                item={item} 
                onPressContent={_onPressContent.bind(null, item.chat_id, item.title)} />
            } 
            fetch={api.comment.queryByUserId} 
            keyExtractor={(item) => item.Id}  />
    )
}
