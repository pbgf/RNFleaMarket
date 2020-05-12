import React, { useState, useEffect, Component }  from 'react';
import { connect } from 'react-redux';
import { 
  Text, 
  View, 
  Modal,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
 } from 'react-native';
import { UserState } from '../../store/reducers/user'
import { State } from '../../store/reducers/'
import { getFile } from '../../common/'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

export interface Props {
  user: UserState,
  navigation:NavigationScreenProp<NavigationState>
}

const list = [
  {
    icon: 'mymessage',
    title: '消息',
    url: 'Message',
    key: 1
  },
  {
    icon: 'chat',
    title: '帖子',
    url: 'UserChat',
    key: 2
  },
  {
    icon: 'comment',
    title: '评论',
    url: 'UserComment',
    key: 3
  },
  {
    icon: 'sale',
    title: '转让',
    url: 'UserSecond',
    key: 4
  },
  {
    icon: 'job',
    title: '发布的工作',
    url: 'UserPublish',
    key: 5
  },
  // {
  //   icon: 'buy',
  //   title: '我的订单',
  //   url: 'CardItem',
  //   key: 6
  // },
  // {
  //   icon: 'money',
  //   title: '我卖出的',
  //   url: 'CardItem',
  //   key: 7
  // },
]

const mapStateToProps = ({user}:State) => {
  return {
      user,
  }
}

function meScreen(props: Props) {
  //const [count, setCount] = useState(0);
  const { user, navigation } = props;
  const [modalVisible] = useState(true);
  // Similar to componentDidMount and componentDidUpdate:
  
  useEffect(() => {
    //console.log(props.navigation.setParams({title: '我的'}))
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            navigation.navigate('UserInfo', {
              user: user,
              isEditable: true
            })
          }} activeOpacity={0.7} style={styles.userHeader}>
          <View style={styles.userInfo}>
              <Image style={styles.userIcon} source={{uri:(user.icon?getFile(user.icon):'' || 'default_header')}}></Image>
              <Text style={{marginLeft:15}}>{user.user_name}</Text>
          </View>
          <Text style={{fontSize: 25,color:'rgba(0, 0, 0, 0.3)'}}> > </Text>
        </TouchableOpacity>
        <View style={styles.headerMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {
            navigation.navigate('CardList', {
              Id: user.Id,
              type: 2
            })
          }}>
            <View style={styles.menuIcon}>
                <Image style={{width:30,height:30}} source={{uri: 'buy'}} />
                <Text style={{fontSize: 15,width:70,marginLeft:10}}>我买到的</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {
            console.log(user.Id)
            navigation.navigate('CardList', {
              Id: user.Id,
              type: 1
            })
          }}>
            <View style={styles.menuIcon}>
                <Image style={{width:30,height:30}} source={{uri: 'money'}} />
                <Text style={{fontSize: 15,width:70,marginLeft:10}}>我卖出的</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {
          list.map(item => (
            <TouchableOpacity onPress={() => {navigation.navigate(item.url)}} key={item.key} activeOpacity={0.7} style={styles.item}>
              <View style={styles.icon}>
                <Image style={{width:30,height:30}} source={{uri: item.icon}} />
                <Text style={{fontSize: 15,width:100}}>{item.title}</Text>
              </View>
              <Text style={{fontSize: 25,marginRight:10,color:'rgba(0, 0, 0, 0.3)'}}> > </Text>
            </TouchableOpacity>
          ))
        }
      </View>
      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        >
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ width:200,height:150 }}>
                    <ActivityIndicator size="large" color="#e20000"/>
                </View>
            </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    flex: 2,
    justifyContent: 'center',
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 0.5
  },
  userHeader:{
    // height: '40%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  userInfo:{
    padding:10,
    flexDirection: 'row',
    alignItems:'center',
  },
  userIcon:{
    borderColor:'rgba(0, 0, 0, 0.3)',
    borderWidth: 0.5,
    borderRadius:999,
    width: 70,
    height:70,
  },
  headerMenu:{
    // height: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuItem:{
    width: '45%',
    padding: 10,
    // backgroundColor: 'white'
    // borderColor: '',
    // borderWidth: 0.5
  },
  menuIcon:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  column:{
    flex:1,
    flexDirection:'column'
  },
  info:{

  },
  content:{
    flex: 5,
  },
  item:{
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon:{
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})


export default connect(
  mapStateToProps,
)(meScreen)