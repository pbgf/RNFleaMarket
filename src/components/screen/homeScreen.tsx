import React, { useState, useEffect, Component }  from 'react';
import api from '../../api/'
import { 
    Text, 
    View, 
    Button,
    FlatList,
    ScrollView,
    StyleSheet,
    RefreshControl,
    ActivityIndicator
 } from 'react-native';
import CommunicationItemContainer from '../../containers/CommunicationItemContainer'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { ChatBeautify } from '../../store/reducers/chat'

export interface Props{
    navigation:NavigationScreenProp<NavigationState>
}

export default function HomeScreen (props: Props) {
    const [lists,updateLists] = useState([]) 
    //const [refreshing, setRefreshing] = useState(false)
    const [state,setState] = useState({
        isLoad:false,
        refreshing: false,
        pageNumber: 1,
        pageLimit: 2,
        pageCount: 2,
        animating: true,
        nomore: false,
    })
    const getList = (limit?:number) => (
        api.chat.queryParams(
            {
                limit: limit || state.pageCount,
                offset: 0
            }
        )
        .then(res => res.json())
        .then(response => {
            updateLists(response.result)
            return response
        })
    )
    const _onRefresh = () => {
        console.log('Refreshing')
        setState(Object.assign({},state,{
            refreshing: true,
        }))
        getList().then(() => {
            setState(Object.assign({},state,{
                refreshing: false,
            }))
        })
    }
    const _onEndReached = () => {
        if(state.isLoad){
            console.log('_onEndReached')
            setState(Object.assign({},state,{
                pageNumber: state.pageNumber+1,
                pageCount: state.pageCount + state.pageLimit
            }))
            getList(state.pageCount + state.pageLimit).then((response) => {
                if(response.result.length === lists.length){
                    setState(Object.assign({},state,{
                        nomore: true
                    }))
                }
            })
        }
    } 
    const ListFooterComponent = () => {
        return (
          <View style={styles.bottomfoot}>
            {
                state.nomore ? (
                <Text style={styles.footText}>- 我是有底线的 -</Text>
                ) : (
                    <View style={styles.activeLoad}>
                    <ActivityIndicator size="small" animating={state.animating} />
                    <Text style={[styles.footText, styles.ml]}>加载更多...</Text>
                    </View>
                )
            }
          </View>
        );
      };
    useEffect(() => {
        getList().then(() => {
            setState(Object.assign({},state,{
                isLoad:true
            }))
        })
    },[])
    return (
    <View style={{flex: 1, width:'100%', height:'100%',justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
            style={{width:'100%',height:'100%'}}
            data={lists}
            keyExtractor={(item:ChatBeautify) => item.Id}
            onEndReached={_onEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={ListFooterComponent}
            refreshControl={
                <RefreshControl
                    refreshing={state.refreshing}
                    onRefresh={_onRefresh}
                />
            }
            renderItem={ ({item}) => 
                <CommunicationItemContainer
                    item={item}
                    navigation={props.navigation}
                    />
            }
        ></FlatList>
    </View>
    );
}

const styles = StyleSheet.create({
    bottomfoot: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    footText: {
      marginTop: 5,
      fontSize: 12,
      color: '#999999',
    },
  
    activeLoad: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ml: {
      marginLeft: 10,
    },
  });