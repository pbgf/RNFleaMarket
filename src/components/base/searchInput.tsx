import React, { useState } from 'react'
import { StatusBar, TextInput, StyleSheet, Dimensions, View } from 'react-native'
import MyButton from '../button/myButton'
import { MyListViewApi } from './myListView'
import { _get } from '../../common/'

export interface props {
    myRef: React.RefObject<MyListViewApi> | undefined
}

const screenWidth = Math.round(Dimensions.get('window').width);
export default function SearchInput(props:props) {
    const [query, OnChangeQuery] = useState('')
    const search = () => {
      _get<Function>(props, 'myRef.current.refresh', () => {})(query)
      //props.myRef && props.myRef.current && props.myRef.current.refresh(query)
    }
    return (
      <View style={{width:screenWidth,height:'100%',flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
        <TextInput
        placeholder='搜索' 
        clearButtonMode='while-editing'
        underlineColorAndroid='transparent'
        onChangeText={text => OnChangeQuery(text)}
        style={styles.input}
        value={query}
      />
      <MyButton 
        backgroundColor="#fff" 
        title="搜索" 
        //isRadius={true}
        color={'black'}
        onPress={search}
        //width={'20%'}
        height={30}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width:'70%',
        height: 30,
        //width:0.8*screenWidth,
        padding: 0,
        paddingLeft: 10,
        //marginBottom:10,
        //marginHorizontal: 10, 
        borderRadius: 5,
        backgroundColor: '#fff',
    }
})
