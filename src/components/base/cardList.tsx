import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ListRenderItemInfo
} from 'react-native';
import api from '../../api/'
import { Container, Header, Content, Card, CardItem, Text, Body, Icon } from "native-base";
import { getFile } from '../../common/'
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { OrderBeautiful } from '../../store/reducers/order';
import MyListView, { MyListViewApi } from '../base/myListView'
export interface Props {
  // order: OrderBeautiful
  navigation:NavigationScreenProp<NavigationState>
}

export default function CardList (props:Props) {
    const { navigation } = props
    const [id] = useState(navigation.getParam('Id'))
    const [type] = useState(navigation.getParam('type'))
    let _fetch
    if(type===2){
      _fetch = api.order.queryBuy.bind(null,{id})
    }else{
      _fetch = api.order.querySale.bind(null,{id})
    }
    const jumpToQQ = (entity:OrderBeautiful) => {
      Linking.canOpenURL(`mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${entity.user?.qq}`).then(supported => { // weixin://  alipay://
          if (supported) {
              Linking.openURL(`mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${entity.user?.qq}`)
          } else {
              global.toast_ref.current.show('出现了错误，请检查是否下载或登录QQ')
              console.warn('error')
          }
      })
    }
    // const _fetch = api.order.queryBuy
    const ref = useRef<MyListViewApi>(null)
    useEffect(() => {
      ref?.current?.refresh()
    },[])
    const _renderItem = ({item}:ListRenderItemInfo<OrderBeautiful>) => {
      let order = item
      return (
        <Card style={styles.cardItem}>
          <CardItem style={{flexDirection: 'row'}} header button onPress={() => navigation.navigate('UserInfo', {
            user: type===2?item.merchant_user:item.user,
            isEditable: false
          })}>
            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: getFile(order.merchant_user?.icon || '')}} />
            <Text style={{marginLeft: 10}}>{order.merchant_user?.user_name}</Text>
          </CardItem>
          <CardItem button onPress={() => navigation.navigate('OrderDetail', {
            orderId: item.Id,
            type
          })}>
            <Body>
              <Text>
                {order.secondHand&&order.secondHand.detail.length>100?(order.secondHand.detail.slice(0,100)+'.....'):order.secondHand?.detail}
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{flexDirection: 'row'}} footer button onPress={jumpToQQ.bind(null,item)}>
            <Image style={{width: 25, height: 25}} source={{uri: 'bw_message'}} />
            <Text style={{marginLeft: 10}}>聊一聊</Text>
          </CardItem>
        </Card>
      )
    }
    return (
      <View style={styles.container}>
        <MyListView ref={ref} fetch={_fetch} renderItem={_renderItem} keyExtractor={(item) => item.Id} />
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 10,
    width: '100%',
    alignItems:'center'
  },
  cardItem:{
    width: '100%',
    marginBottom: 10,
  }
})
