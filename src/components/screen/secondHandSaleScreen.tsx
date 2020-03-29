import React, { useState, useEffect, Component, useRef }  from 'react';
import { 
    Text, 
    View, 
    FlatList,
    ActivityIndicator,
    ListRenderItemInfo
} from 'react-native';
import SecondHandItem from '../items/secondHandItem'
import MyListView from '../base/myListView'
import { JobState } from '../../store/reducers/job'
import api from '../../api/'
import store from '../../store/'
import { saveRefs } from '../../store/actions/'
import { MyListViewApi } from '../base/myListView'

export default function secondHandSaleScreen (props:any) {
    // const [lists,setLists] = useState<Item[]>([])
    const [isLoad,setIsLoad] = useState(false)
    const listRef = useRef<MyListViewApi>(null)
    useEffect(()=>{
        store.dispatch(saveRefs({jobListRef:listRef}))
    },[])
    const _renderItem = ({item}:ListRenderItemInfo<any>) => 
            <SecondHandItem 
            item={item}
            navigation={props.navigation}  />

    const _keyExtractor = (item:JobState) => item.Id
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyListView 
                ref={listRef}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                fetch={api.secondHand.queryParams} 
            />
        </View>
    );
}
