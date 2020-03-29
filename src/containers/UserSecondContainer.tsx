import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import UserSecondHand from '../components/userInfo/userSecondHand'
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

function UserSecondContainer (props:Props) {
    const { navigation, user } = props
    return (
        <UserSecondHand user={user} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps,
)(UserSecondContainer)