import React, {useState, useEffect, useRef, RefObject} from 'react'

import api from '../../api/'
import MyListView, {MyListViewApi} from '../base/myListView'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import { CommentBeautify } from '../../store/reducers/comment'
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
    const _onPressContent = ({title, type, chat_id}:CommentBeautify) => {
        switch(type){
            case '1':
            case '2':
                navigation.navigate('CommunicationDetail', {
                    communicationId: chat_id,
                    title: title
                })
                break;
            case '3':
                navigation.navigate('SecondHandDetail',{
                    secondHandId: chat_id,
                })
                break;
            case '4':
                navigation.navigate('JobDetail',{
                    jobId: chat_id,
                })
                break;
        }
        
    }
    useEffect(() => {
        getList()
    },[])
    return (
        <MyListView ref={ref} 
            renderItem={({item}) => 
                <CommentItem 
                item={item} 
                onPressContent={_onPressContent.bind(null, item)} />
            } 
            fetch={api.comment.queryByUserId} 
            keyExtractor={(item) => item.Id}  />
    )
}
