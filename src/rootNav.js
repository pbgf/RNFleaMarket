import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar, TextInput, StyleSheet, Dimensions } from 'react-native'
import Tab from './components/Tab'
import LoginContainer from './containers/LoginContainer'
import Register from './components/register'
import Publish from './components/publish'
import JobPublish from './components/publish/jobPublish'
import PostPublish from './components/publish/postPublish'
import SalePublish from './components/publish/salePublish'
import CommunicationDetailContainer from './containers/CommunicationDetailContainer'

const screenWidth = Math.round(Dimensions.get('window').width);

function SearchInput() {
    return (
      <TextInput
        placeholder='搜索' 
        clearButtonMode='while-editing'
        underlineColorAndroid='transparent'
        style={styles.input}
      />
    );
}

const defaultNavigationOptions = ({navigation})=> {
  let title = '校园跳蚤市场'
  switch(navigation.state.index){
    case 1:
    case 3:
      title = () => <SearchInput />
      break
    case 4:
      title = '我的'
  }
  return {
      headerStyle: { 
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: '#ff2d55',
          height: 44 + StatusBar.currentHeight,
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerBackTitle: null,
      headerTitle: title,
  };
}
const Main = createStackNavigator(
    {
        Tab,
        JobPublish,
        PostPublish,
        SalePublish,
        CommunicationDetailContainer
    },
    {
        mode: 'card',
        headerMode: 'screen',
        defaultNavigationOptions
    }
)
const StackNavigator = createStackNavigator(
  {
    LoginContainer,
    Register,
    Main,
    Publish
  },
  {
    headerMode:'none'
  }
)

const styles = StyleSheet.create({
  input: {
    flex: 1, 
    height: 10,
    width:0.8*screenWidth,
    padding: 0,
    paddingLeft: 10,
    marginBottom:10,
    //marginHorizontal: 10, 
    borderRadius: 5,
    backgroundColor: '#fff',
  }
})

export default createAppContainer(StackNavigator);
