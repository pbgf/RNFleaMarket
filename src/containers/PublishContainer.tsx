import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import Publish from '../components/publish/'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { State } from '../store/reducers/'
import { UserState } from '../store/reducers/user'

const mapStateToProps = ({user}:State) => {
    return {
        user,
    }
}

export interface Props { 
    navigation:NavigationScreenProp<NavigationState>,
    user: UserState
}

function PublishContainer (props:Props) {
    const { navigation, user } = props
    return (
        <Publish navigation={navigation} user={user} />
    )
}

export default connect(
    mapStateToProps,
  )(PublishContainer)