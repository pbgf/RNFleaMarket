import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar, TextInput, StyleSheet, Dimensions, View, BackHandler, ToastAndroid } from 'react-native'
import Tab from './components/Tab'
import LoginContainer from './containers/LoginContainer'
import Register from './components/register'
import Publish from './containers/PublishContainer'
import UserInfo from './components/userInfo/userInfo'
import EditInput from './components/base/editInput'
import CommunicationDetail from './containers/CommunicationDetailContainer'
import JobDetail from './containers/JobContainer'
import SecondHandDetail from './containers/SecondHandDetailContainer'
import Message from './containers/MessageContainer'
import UserPublish from './containers/UserPublishContainer'
import UserChat from './containers/UserChatContainer'
import UserComment from './containers/UserCommentContainer'
import UserSecond from './containers/UserSecondContainer'
import CardList from './components/base/cardList'
import OrderDetail from './components/detail/orderDetail'
import OrderSubmit from './containers/OrderSubmitContainer'
import MyButton from './components/button/myButton'
import { NavigationNavigatorProps, NavigationState } from 'react-navigation'
import { _get } from './common/index'
import SearchInput from './containers/SearchInputContainer'
import SaleSearchInput from './containers/SaleSearchInputContainer'

const screenWidth = Math.round(Dimensions.get('window').width)

const defaultNavigationOptions = ({navigation}:NavigationNavigatorProps<{},NavigationState>):any=> {
  let title:any = '校园跳蚤市场'
  switch(_get<number>(navigation, 'state.index')){
    case 1:
      title = () => <SearchInput />
      break
    case 3:
      title = () => <SaleSearchInput />
      break
    case 4:
      title = '我的'
  }
  let cnt = 1
  const handleBackPress = () => {
    if(navigation?.state.routeName == 'Tab'){
      if(cnt == 2){
        BackHandler.exitApp()
        cnt = 1
      }else{
        cnt++
        //global.toast_ref.current.show('再点一次返回退出程序')
        ToastAndroid.show('再按一次退出程序', ToastAndroid.SHORT)
        setTimeout(() => {
          cnt=1
        },1000)
      }
    }else{
      navigation.goBack()
    }
    return true
  }
  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  return {
      headerStyle: { 
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: '#ff2d55',
          height: 44 + _get<number>(StatusBar, 'currentHeight', 0),
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
        UserInfo,
        EditInput,
        CardList,
        OrderDetail,
        OrderSubmit,
        CommunicationDetail:{
          screen:CommunicationDetail,
          navigationOptions: ({ navigation }:NavigationNavigatorProps<{},NavigationState>) => ({
            headerTitle: _get<string>(navigation,'state.params.title'),
          }),
        },
        JobDetail:{
          screen:JobDetail,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '职位详情',
          }),
        },
        SecondHandDetail:{
          screen:SecondHandDetail,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '二手详情',
          }),
        },
        Message:{
          screen: Message,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '我的消息',
          }),
        },
        UserPublish: {
          screen: UserPublish,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '我发布的招聘',
          }),
        },
        UserChat: {
          screen: UserChat,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '我发布的帖子',
          }),
        },
        UserComment: {
          screen: UserComment,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '我发布的评论',
          }),
        },
        UserSecond: {
          screen: UserSecond,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '我发布的二手转让',
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
