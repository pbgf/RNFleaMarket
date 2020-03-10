import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import CommunicationDetail from '../components/detail/communicationDetail'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { State } from '../store/reducers/'
import { UserState } from '../store/reducers/user'

export interface Props {
    navigation: NavigationScreenProp<NavigationState>,
    userInfo: UserState
}

const mapStateToProps= ({user}:State) => {
    return {
        userInfo: user,
    }
}

function CommunicationDetailContainer (props: Props) {
    const { userInfo, navigation } = props
    return (
        <CommunicationDetail userInfo={userInfo} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps
  )(CommunicationDetailContainer)