import React, { useRef } from 'react';
import {
  StatusBar, 
  View,
} from 'react-native'
import RootNat from './rootNav'
import { height } from './config/device'
import Toast from './components/base/toast'

export default function App () {
  const toast_ref = useRef()
  global.toast_ref = toast_ref
  return (
    <View style={{height: height}}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='light-content'
      ></StatusBar>
      <RootNat></RootNat>
      <Toast ref={toast_ref} />
    </View>
  )
}
