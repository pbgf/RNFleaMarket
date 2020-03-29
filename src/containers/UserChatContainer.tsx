import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import UserChat from '../components/userInfo/userChat'
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

function UserChatContainer (props:Props) {
    const { navigation, user } = props
    return (
        <UserChat user={user} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps,
)(UserChatContainer)