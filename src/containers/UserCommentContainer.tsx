import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import UserComment from '../components/userInfo/userComment'
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

function UserCommentContainer (props:Props) {
    const { navigation, user } = props
    return (
        <UserComment user={user} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps,
)(UserCommentContainer)