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
    ActivityIndicator,
    ListRenderItemInfo
 } from 'react-native';
import MyListView from '../base/myListView'
import CommunicationItemContainer from '../../containers/CommunicationItemContainer'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { ChatBeautify } from '../../store/reducers/chat'

export interface Props{
    navigation:NavigationScreenProp<NavigationState>
}

export default function HomeScreen (props: Props) {
    const _renderItem = ({item}:ListRenderItemInfo<any>) => 
        <CommunicationItemContainer
            item={item}
            navigation={props.navigation}
        />
    const _keyExtractor = (item:ChatBeautify) => item.Id
    return (
        <MyListView renderItem={_renderItem} fetch={api.chat.queryParams} keyExtractor={_keyExtractor}  />
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