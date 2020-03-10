import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import Login from '../components/login'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import {
    saveUserInfo
} from '../store/actions/index'
import { State } from '../store/reducers/'
import { UserState } from '../store/reducers/user'

const mapStateToProps = ({user}:State) => {
    return {
        user,
    }
}

export interface Props { 
    navigation:NavigationScreenProp<NavigationState>,
    dispatch: Function
}

function LoginContainer (props:Props) {
    const { dispatch, navigation } = props
    const saveUser = (user:UserState) => {
        dispatch(saveUserInfo(user))
    }
    return (
        <Login saveUser={saveUser} navigation={navigation}  />
    )
}

export default connect(
    mapStateToProps,
  )(LoginContainer)