import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar, TextInput, StyleSheet, Dimensions, View } from 'react-native'
import Tab from './components/Tab'
import LoginContainer from './containers/LoginContainer'
import Register from './components/register'
import Publish from './components/publish'
import JobPublish from './components/publish/jobPublish'
import PostPublish from './components/publish/postPublish'
import SalePublish from './components/publish/salePublish'
import EditInput from './components/base/editInput'
import CommunicationDetailContainer from './containers/CommunicationDetailContainer'
import JobDetail from './components/detail/jobDetail'
import MyButton from './components/button/myButton'
import { NavigationNavigatorProps, NavigationState } from 'react-navigation'
import { _get } from './common/index'
import SearchInput from './containers/SearchInputContainer'

const screenWidth = Math.round(Dimensions.get('window').width);

const defaultNavigationOptions = ({navigation}:NavigationNavigatorProps<{},NavigationState>):any=> {
  let title:any = '校园跳蚤市场'
  switch(_get(navigation, 'state.index')){
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
          height: 44 + _get(StatusBar, 'currentHeight', 0),
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
        EditInput,
        CommunicationDetailContainer:{
          screen:CommunicationDetailContainer,
          navigationOptions: ({ navigation }:NavigationNavigatorProps<{},NavigationState>) => ({
            headerTitle: _get(navigation,'state.params.title'),
          }),
        },
        JobDetail:{
          screen:JobDetail,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '职位详情',
          }),
        }
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

export default createAppContainer(StackNavigator);
