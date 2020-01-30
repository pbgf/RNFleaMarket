import React from 'react';
import {
  StatusBar, 
  View,
} from 'react-native'
import RootNat from './rootNav'
import { height } from './config/device'

export default function App () {
  return (
    <View style={{height: height}}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content'
      ></StatusBar>
      <RootNat></RootNat>
    </View>
  )
}
