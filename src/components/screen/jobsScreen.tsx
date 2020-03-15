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
export interface Item {
    Id:string,
    job_name:string,
    job_pay:string,
    job_detail:string,
    publish_time:string,
    publish_user:string
}

export default function JobScreen (props:any) {
    // const [lists,setLists] = useState<Item[]>([])
    const [isLoad,setIsLoad] = useState(false)
    const listRef = useRef<any>()
    useEffect(()=>{
        store.dispatch(saveRefs({jobListRef:listRef}))
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
