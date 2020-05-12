import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    Alert,
    Linking,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Icon } from "native-base";
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { OrderBeautiful } from '../../store/reducers/order';
import { getFile } from '../../common';
import api from '../../api/'
import { width } from '../../config/device';

export interface Props{
    navigation:NavigationScreenProp<NavigationState>
}

export default function (props:Props){
    const { navigation } = props
    const [stepList,setStepList] = useState([
        {
            title:'已拍下',
            state:0,
        },
        {
            title:'已付款',
            state:0,
        },
        {
            title:'已发货',
            state:0,
        },
        {
            title:'交易成功',
            state:0,
        },
    ])
    const [order,setOrder] = useState<OrderBeautiful>();
    const [modalVisible,setModalVisible] = useState(false);
    const [orderId] = useState(navigation.getParam('orderId'));
    const [type] = useState(navigation.getParam('type'));
    const [operationText, setOperationText] = useState('');
    const [alertText, setAlertText] = useState('');
    const [canClick, setCanClick] = useState(true);
    // const [cb, setCb] = useState<Function>(() => {});
    const getData = () => {
        return api.order.queryById(orderId)
        .then(res => res.json())
        .then(response => {
            if(response.result) setOrder(response.result[0])
        })
    }
    const callTel = (telephone:string) => {
        Linking.canOpenURL(`tel://${telephone}`).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(`tel://${telephone}`)
            } else {
                global.toast_ref.current.show('出现了错误')
                console.warn('error')
            }
        })
    }
    const jumpToDetail = () => {
        navigation.navigate('SecondHandDetail', {
            secondHandId: order?.secondHand?.Id
        })
    }
    // const refresh = () => {
    //     api.order.queryById(order?.Id)
    //     .then(res => res.json())
    //     .then(response => {
    //         console.log(response)
    //         setOrder(response.result[0])
    //     })
    // }
    useEffect(() => {
        (async () => {
            await getData();
            setModalVisible(true);
        })()
    },[])
    useEffect(() => {
        let list = stepList.map((item,index) => {
            if(index<Number(order?.state)){
                item.state = 1
            }
            return item
        })
        if(type===2){
            switch(order?.state){
                case '1':
                    setOperationText('付款');
                    setAlertText('付款将会从您得钱包中扣除费用，确定要付款吗？');
                    // setCb(() => api.user.cost);
                    break;
                case '2':
                    setOperationText('待发货');
                    setCanClick(false);
                    break;
                case '3':
                    setOperationText('确认收货');
                    setAlertText('确定要确认收货吗？');
                    // setCb(() => api.order.updateState);
                    break;
                case '4':
                    setOperationText('交易完成');
                    setCanClick(false);
            }
        }else{
            switch(order?.state){
                case '1':
                    setOperationText('待付款');
                    setCanClick(false);
                    break;
                case '2':
                    setOperationText('确认已发货');
                    setAlertText('确定已发货？');
                    // setCb(() => api.order.updateState);
                    break;
                case '3':
                    setOperationText('待收货');
                    setCanClick(false);
                    break;
                case '4':
                    setOperationText('交易完成');
                    setCanClick(false);
            }
        }
        setStepList(list)
    },[order])
    return (
        <View style={{width:'100%', height: '100%'}}>
            {
                modalVisible?(
                    <View style={styles.container}>
                        <View style={styles.steps}>
                            {
                                stepList.map((step,index) => (
                                    <React.Fragment key={step.title}>
                                        <View style={styles.step}>
                                            <View style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                                                {step.state?<Icon type="FontAwesome" name="check-circle-o" />:<Icon style={{opacity:0.3,fontSize:15}} type="FontAwesome" name="circle" />}
                                            </View>
                                            <Text style={{width:70,paddingTop:5,textAlign:'center',opacity:step.state?1:0.5}}>{step.title}</Text>
                                        </View>
                                        {index===(stepList.length-1)?null:<View style={{width:'15%',height:1,borderWidth:1,borderColor:'black'}}></View>}
                                    </React.Fragment>
                                ))
                            }
                        </View>
                        <TouchableOpacity onPress={jumpToDetail} activeOpacity={0.7} style={styles.content}>
                            {
                                order?.secondHand?.imgList?(
                                    <View style={styles.imgSlot}>
                                        <Image style={{width:100,height:100,borderRadius:10}} source={{uri: getFile(order?.secondHand?.imgList[0].url || '')}} />
                                    </View>
                                ):null
                            }
                            <View style={{width:'50%'}}>
                                <Text style={{textAlign:'left'}}>
                                    {order?.secondHand&&order?.secondHand.detail.length>20?(order.secondHand.detail.slice(0,20)+'.....'):order?.secondHand?.detail}
                                </Text>
                            </View>
                            <View>
                                <Text style={{color:'red'}}>
                                    ￥{order?.secondHand?.price}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.orderDetail}>
                            <View style={styles.row}>
                                <Text style={{fontSize: 20}}>订单信息</Text>
                                <TouchableOpacity style={{
                                    borderWidth: 0.5, 
                                    borderColor: '#e1e1e1', 
                                    borderRadius: 10,
                                    width:90,
                                    padding: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} onPress={callTel.bind(null,type===1?order?.user?.telephone||'':order?.merchant_user?.telephone||'')}><Text>联系{type===1?'买':'卖'}家</Text></TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <Text style={{color:'#999'}}>{type===1?'买':'卖'}家昵称：{type===1?order?.user?.user_name:order?.merchant_user?.user_name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{color:'#999'}}>订单编号：{order?.user?.user_name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={{color:'#999'}}>创建时间：{order?.create_time}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => {
                            if(canClick){
                                Alert.alert(
                                    '提示',
                                    alertText,
                                    [
                                        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                        {text: '确定', onPress: () => {
                                            (async () => {
                                                let EOF = false;
                                                api.order.updateState({orderId: order?.Id})
                                                .then((res:any) => res.json())
                                                .then((response:any) => {
                                                    if(response.status != 200){
                                                        EOF = true
                                                    }
                                                    global.toast_ref.current.show(response.msg)
                                                })
                                                if(EOF){
                                                    return ;
                                                }
                                                if(Number(order?.state) === 1){
                                                    await api.user.cost({Id: order?.user?.Id, money: order?.money})
                                                    .then((res:any) => res.json())
                                                    .then((response:any) => {
                                                        if(response.status != 200){
                                                            throw new Error(response.msg)
                                                        }
                                                    }).catch((err) => {
                                                        global.toast_ref.current.show(err.toString())
                                                    })
                                                }
                                                setTimeout(() => {
                                                    getData()
                                                })
                                            })();
                                        }},
                                    ]
                                )
                            }
                        }}>
                            <Text>
                                {operationText}    
                            </Text>
                        </TouchableOpacity>
                        {/* <Modal
                            animationType="slide"
                            transparent={false}
                            visible={modalVisible}
                        >
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7'}}>
                                <View style={{ width:200,height:150 }}>
                                    <ActivityIndicator size="large" color="#e20000"/>
                                </View>
                            </View>
                        </Modal> */}
                    </View>
                ):(
                    <View style={{justifyContent:'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        <ActivityIndicator size="large" color="#e20000"/>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    steps: {
        width:'100%',
        paddingBottom:60,
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#ff2d55'
    },
    step: {
        width:30,
        height:30,
        alignItems:'center',
        
    },
    textRow:{
        width:'90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    content:{
        backgroundColor:'white',
        width:'100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imgSlot:{
        width:100
    },
    orderDetail:{
        marginTop: 10,
        backgroundColor: 'white',
        flex:1,
        width: '100%'
    },
    row:{
        width: '100%',
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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