import React, { useState } from 'react'
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native'
export default function TabBar (props) { 
    const { navigation } = props
    const { routes } = navigation.state
    const renderItem = (route, index) => {
        const { navigation, jumpTo, activeTintColor, inactiveTintColor } = props
        const focused = (index === navigation.state.index)
        const color = focused ? activeTintColor : inactiveTintColor
        const TabScene = {
            focused,
            route,
            color,
        };
        if (index === 2) {
            return (
                <TouchableOpacity
                    key={route.key} 
    				activeOpacity={0.7}
                    style={styles.tabItem} 
                    onPress={() => navigation.navigate('Publish')}
                    >
                    <View  style={styles.tabItem}>
                        {props.renderIcon(TabScene)}
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    key={route.key} 
                    style={styles.tabItem} 
                    onPress={() => jumpTo(route.key)}
                    >
                    <View style={styles.tabItem}>
                        {props.renderIcon(TabScene)}
                        <Text style={{color, fontSize: 10}}>
                            {props.getLabelText(TabScene)}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    return (
        <View style={styles.tab}>
            {routes && routes.map((route,index) => renderItem(route, index))}
        </View>
    )
}
const styles = {
    tab: {
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent:'space-around',
        borderTopColor: 'rgba(0, 0, 0, 0.3)',
        borderTopWidth: 0.5,
        paddingBottom: 0,
    },
    tabLine: {
        height: 0.5, 
        backgroundColor: 'rgba(100, 100, 100, 0.3)', 
    },
    tabItem: {
        height:49,
        width:49,
        alignItems:'center',
        justifyContent:'center'
    },
}
