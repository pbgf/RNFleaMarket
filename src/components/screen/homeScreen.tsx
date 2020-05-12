import React, { useEffect, useRef, useState }  from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { width } from '../../config/device';
import api from '../../api/'
import { 
    Text, 
    View, 
    Picker,
    Button,
    FlatList,
    Linking,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    ListRenderItemInfo,
    TouchableOpacity
 } from 'react-native';
import MyListView, { MyListViewApi } from '../base/myListView'
import NewsItem from '../items/newsItem'
import CommunicationItemContainer from '../../containers/CommunicationItemContainer'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { ChatBeautify } from '../../store/reducers/chat'

export interface Props{
    navigation:NavigationScreenProp<NavigationState>
}

export default function HomeScreen (props: Props) {
  const { navigation } = props
  const [order, setOrder] = useState('publish_time')
  const [type, setType] = useState('')
  const ref = useRef<MyListViewApi>(null)
  const newListRef = useRef<MyListViewApi>(null)
  const _renderItem = ({item}:ListRenderItemInfo<any>) => 
      <CommunicationItemContainer
          item={item}
          navigation={props.navigation}
      />
  const _renderNews = ({item,index}:ListRenderItemInfo<any>) => {
    return (
      <NewsItem item={item} index={index} />
    )
  }
  const _keyExtractor = (item:ChatBeautify) => item.Id
  const _renderTabBar = () => {
      return <DefaultTabBar
            backgroundColor={'#ff2e57'}
            activeTextColor={'#fff'}
            inactiveTextColor={'#fff'}
            textStyle={styles.tabBarText}
            underlineStyle={styles.tabBarUnderline}
            style={{height: 35}}
            />
  }
  const refresh = () => {
    ref?.current?.refresh(type, order)
  }
  useEffect(() => {
    refresh()
  },[order, type])
  return (
    <ScrollableTabView renderTabBar={_renderTabBar} onScroll={(page) => {
      if(page === 1){
        newListRef?.current?.refresh()
      }
    }}>
      <View tabLabel="主页"  style={styles.container}>
        {/* <ScrollableTabView
            style={{ marginTop: 20 }}
            initialPage={1}
            renderTabBar={() => <DefaultTabBar />}
          >
            <Text tabLabel='Tab #1'>My</Text>
            <Text tabLabel='Tab #2'>favorite</Text>
            <Text tabLabel='Tab #3'>project</Text>
          </ScrollableTabView> */}
        <View style={{flexDirection:'row',width:'100%', borderBottomColor: 'rgba(0, 0, 0, 0.3)', borderBottomWidth: 0.5}}>
          <Picker
                selectedValue={type}
                style={{height: 50, width:'50%'}}
                onValueChange={(itemValue, itemIndex) =>
                  {
                    setType(itemValue)
                  }
                }>
                <Picker.Item label="全部" value={'all'} />
                <Picker.Item label="求助" value={'0'} />
                <Picker.Item label="交友" value={'1'} />
          </Picker>
          <Picker
              selectedValue={order}
              style={{height: 50, width:'50%'}}
              onValueChange={(itemValue, itemIndex) =>
                {
                  setOrder(itemValue)
                }
              }>
              <Picker.Item label="按点赞最多排序" value={'like_cnt'} />
              <Picker.Item label="按评论最多排序" value={'comment_cnt'} />
              <Picker.Item label="按最新排序" value={'publish_time'} />
          </Picker>
        </View>
        <MyListView ref={ref} renderItem={_renderItem} fetch={api.chat.queryParams} keyExtractor={_keyExtractor}  />
            
      </View>
      <MyListView tabLabel="热点" ref={newListRef} renderItem={_renderNews} fetch={api.news} keyExtractor={(item) => item.id}></MyListView>
    </ScrollableTabView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  tabBarText: {
		fontSize: 13, 
		textAlign: 'center',
	},
	tabBarUnderline: {
    width: '50%', 
		// marginHorizontal: 10, 
		backgroundColor: '#fff',
		borderRadius: 4,
		marginBottom: 2,
  },
  // bottomfoot: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 10,
  // },
  // footText: {
  //   marginTop: 5,
  //   fontSize: 12,
  //   color: '#999999',
  // },
  // activeLoad: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // ml: {
  //   marginLeft: 10,
  // },
});
