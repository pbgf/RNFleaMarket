import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MeScreen from './screen/meScreen'
import PublishPlaceHolderScreen from './screen/publishPlaceHolderScreen'
import SecondHandSaleScreen from './screen/secondHandSaleScreen'
import HomeScreen from './screen/homeScreen'
import JobsScreen from './screen/jobsScreen'
import TabBar from './TabBar'
const tabBarOptions = {
  activeTintColor: '#ff2e57',
  inactiveTintColor: '#666',
}
export default  createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {  
            tabBarIcon: ({focused}) => (  
                <Image 
                    source={{uri: focused ? 'tabbar_essence_click' : 'tabbar_essence'}}  
                    style={styles.item}  
                    />  
            ),
            tabBarLabel: '社区'
        }
      },
      Jobs: {
        screen: JobsScreen,
        navigationOptions: {  
            tabBarIcon: ({focused}) => (  
                <Image 
                    source={{uri: focused ? 'tabbar_new_click' : 'tabbar_new'}}  
                    style={styles.item}  
                    />  
            ),
            tabBarLabel: '兼职招聘',    
        }
      },
      PublishPlaceHolder: {
        screen: PublishPlaceHolderScreen,
        navigationOptions: {
          tabBarIcon: ({focused}) => (  
              <Image 
                  source={{uri: focused ? 'tabbar_publish_click' : 'tabbar_publish'}}  
                  style={styles.centerItem}  
                  />  
          ),
        },
      },
      SecondHandSale: {
        screen: SecondHandSaleScreen,
        navigationOptions: {
          tabBarIcon: ({focused}) => (  
              <Image 
                  source={{uri: focused ? 'tabbar_friend_click' : 'tabbar_friend'}}  
                  style={styles.item}  
                  />  
          ),
          tabBarLabel: '二手转让',   
        }
      },
      Me: {
        screen: MeScreen,
        navigationOptions: {
          tabBarIcon: ({focused}) => (  
              <Image 
                  source={{uri: focused ? 'tabbar_me_click' : 'tabbar_me'}}  
                  style={styles.item}  
                  />  
          ),
          tabBarLabel: '个人中心',
        }
      }
    },
    {
      tabBarComponent:(props) => <TabBar {...props} />,
      tabBarOptions
    }
  );

  const styles = StyleSheet.create({
    item: {
        width: 27,
        height: 27,
    },
    centerItem: {
        width: 38,
        height: 38,
    },
  })
