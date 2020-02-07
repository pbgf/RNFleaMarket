import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import Login from '../components/login'
import {
    saveUserInfo
} from '../store/actions/index'

const mapStateToProps= (state) => {
    return {
        user: state.user,
    }
}

function LoginContainer (props) {
    const { dispatch, navigation } = props
    const saveUser = (user) => {
        dispatch(saveUserInfo(user))
    }
    return (
        <View style={{flex:1}}>
            <Login saveUser={saveUser} navigation={navigation}  />
        </View>
    )
}

export default connect(
    mapStateToProps,
  )(LoginContainer)