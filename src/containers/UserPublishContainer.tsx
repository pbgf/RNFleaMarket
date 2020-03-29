import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import UserPublishJobs from '../components/userInfo/userPublishJobs'
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

function UserPublishContainer (props:Props) {
    const { navigation, user } = props
    return (
        <UserPublishJobs user={user} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps,
)(UserPublishContainer)