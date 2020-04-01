import React, { useState, useEffect, Component, useImperativeHandle, forwardRef }  from 'react';
import api, { Response, pageParam } from '../../api/'
import { 
    Text, 
    View, 
    Button,
    FlatList,
    FlatListProps,
    ScrollView,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    ListRenderItem
 } from 'react-native';

export interface MyListViewApi {
    refresh: (query: string) => void
}
export interface Props{
    renderItem: ListRenderItem<any>,
    fetch: (param: pageParam) => Promise<any>,
    keyExtractor: (item: any, index: number) => string,
    onLoad?: () => void
}

function myListView (props: Props, ref:React.Ref<any>) {
    const { renderItem, fetch, keyExtractor, onLoad } = props
    const [lists, updateLists] = useState([])
    const [state,setState] = useState({
        isLoad:false,
        refreshing: false,
        pageNumber: 1,
        pageLimit: 10,
        pageCount: 5,
        animating: true,
        nomore: false,
        query: ''
    })
    const getList = (limit?:number, query?:string) => (
        fetch(
            {
                query: state.query || query  || '',
                limit: limit || state.pageCount,
                offset: 0
            }
        )
        .then(res => res.json())
        .then(response => {
            console.log(response)
            updateLists(response.result)
            return response
        }).catch((err) => {
            console.log(err)
        })
    )
    const _onRefresh = () => {
        setState(Object.assign({},state,{
            refreshing: true,
        }))
        getList().then(() => {
            setState(Object.assign({},state,{
                refreshing: false,
            }))
        })
    }
    const _onEndReached = (info:any) => {
        if(state.isLoad && !state.nomore){
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
        // getList().then((response) => {
        //     if(response.result.length === lists.length){
        //         setState(Object.assign({},state,{
        //             nomore: true,
        //             isLoad:true
        //         }))
        //     }else{
        //         setState(Object.assign({},state,{
        //             isLoad:true
        //         }))
        //     }
        //     onLoad && onLoad()
        // }).catch(err => {
        //     console.log(err)
        // })
    },[])
    useImperativeHandle(ref, () => ({
        refresh: (query: string = '') => {
            setState(Object.assign({},state,{
                isLoad:false,
                query
            }))
            getList(state.pageCount, query).then((response) => {
                if(response.result.length === lists.length){
                    setState(Object.assign({},state,{
                        nomore: true,
                        isLoad:true,
                        query
                    }))
                }else{
                    setState(Object.assign({},state,{
                        isLoad:true,
                        query
                    }))
                }
            })
        }
    }))
    return (
    <View style={{flex: 1, width:'100%', height:'100%', justifyContent: 'center', alignItems: 'center'}}>
        {
            state.isLoad?
            <FlatList
            style={{width:'100%',height:'100%'}}
            data={lists}
            keyExtractor={keyExtractor}
            onEndReached={_onEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={ListFooterComponent}
            refreshControl={
                <RefreshControl
                    refreshing={state.refreshing}
                    onRefresh={_onRefresh}
                />
            }
            renderItem={renderItem}
            ></FlatList>:<ActivityIndicator size="large" color="#e20000" />
        }
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
export default forwardRef(myListView)