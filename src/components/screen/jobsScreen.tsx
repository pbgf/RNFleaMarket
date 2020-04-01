import React, { useState, useEffect, Component, useRef }  from 'react';
import { 
    Text, 
    View, 
    FlatList,
    ActivityIndicator,
    ListRenderItemInfo
} from 'react-native';
import JobItem from '../items/jobItem'
import MyListView from '../base/myListView'
import { JobState } from '../../store/reducers/job'
import api from '../../api/'
import store from '../../store/'
import { saveRefs } from '../../store/actions/'
import { MyListViewApi } from '../base/myListView'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
export interface Item {
    Id:string,
    job_name:string,
    job_pay:string,
    job_detail:string,
    publish_time:string,
    publish_user:string
}

export interface Props{
    navigation:NavigationScreenProp<NavigationState>
}

export default function JobScreen (props:Props) {
    // const [lists,setLists] = useState<Item[]>([])
    const { navigation } = props
    const [isLoad,setIsLoad] = useState(false)
    const listRef = useRef<MyListViewApi>(null)
    useEffect(()=>{
        store.dispatch(saveRefs({jobListRef:listRef}))
        listRef.current?.refresh(navigation.getParam('userId'))
    },[])
    const _renderItem = ({item}:ListRenderItemInfo<any>) => 
            <JobItem 
            item={item}
            navigation={props.navigation}  />

    const _keyExtractor = (item:JobState) => item.Id
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyListView 
                ref={listRef}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                fetch={api.job.queryParams} 
            />
        </View>
    );
}
