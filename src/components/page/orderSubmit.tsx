import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    Alert,
    Linking,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Header, Content, Card, CardItem, Body } from "native-base";
import { OrderBeautiful } from '../../store/reducers/order';
import { SecondHandState } from '../../store/reducers/secondHand'
import { getFile } from '../../common';
import api from '../../api/';
import MyButton from '../button/myButton'
import { UserState } from '../../store/reducers/user';

export interface Props{
    navigation:NavigationScreenProp<NavigationState>,
    userInfo: UserState
}

export default function (props:Props){
    const { navigation, userInfo } = props;
    const [data] = useState<SecondHandState>(navigation.getParam('data'));
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <Card style={{width:'100%'}}>
                <CardItem style={styles.card}>
                    <Image style={{width:100,height:100,borderRadius:10}} source={{uri:getFile((data.imgList&&data.imgList[0].url) || '')}} />
                    <View style={{height: '100%',flex:1,padding:10}}>
                        <Text>{data.detail.length>20?data.detail.slice(0,20)+'...':data.detail}</Text>
                        <Text style={{position: 'absolute', bottom: 10, right: 10, color:'red'}}>￥{data.price}</Text>
                    </View>
                </CardItem>
            </Card>
            <View style={styles.footer}>
                {/* <Text>付款：<Text style={{color:'red'}}>￥{data.price}</Text></Text> */}
                <MyButton backgroundColor="#e20000" 
                    title="确认购买" 
                    isRadius={true}
                    onPress={() => {
                        setModalVisible(true);
                        api.order.add({
                            state: 1,
                            create_user: userInfo.Id,
                            merchant: data.publish_user,
                            money: data.price,
                            s_id: data.Id
                        }).then(res => res.json())
                        .then(response => {
                            if(response.status==200){
                                global.toast_ref.current.show('订单创建成功,前往订单详情页面支付');
                                api.order.queryById(response.result.Id)
                                .then(res => res.json())
                                .then((response) => {
                                    if(response.result.length){
                                        navigation.navigate('OrderDetail', {
                                            orderId: response.result[0].Id,
                                            type: 2
                                        })
                                    }else{
                                        throw new Error('新建订单失败');
                                    }
                                }).catch((err) => {
                                    global.toast_ref.current.show(err.toString());
                                })
                            }else{
                                throw new Error('失败');
                            }
                        }).catch(err => {
                            global.toast_ref.current.show(err.toString());
                        }).finally(() => {
                            setModalVisible(false);
                        })
                    }} width={100}/>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ width:200,height:150 }}>
                        <ActivityIndicator size="large" color="#e20000"/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    card: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    footer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        position:'absolute',
        bottom:0,
        width:'100%',
        borderTopColor:'rgba(0, 0, 0, 0.3)',
        borderTopWidth:0.5,
        backgroundColor:'#fff',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
})