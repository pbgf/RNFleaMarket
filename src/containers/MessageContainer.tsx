import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import UserMessage from '../components/userInfo/userMessage'
import {
    saveUserInfo
} from '../store/actions/index'
import { State } from '../store/reducers/'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { UserState } from '../store/reducers/user'

const mapStateToProps = ({user}:State) => {
    return {
        user,
    }
}

export interface Props { 
    navigation: NavigationScreenProp<NavigationState>,
    user: UserState
}

function MessageContainer (props:Props) {
    const { navigation, user } = props
    return (
        <UserMessage user={user} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps,
)(MessageContainer)