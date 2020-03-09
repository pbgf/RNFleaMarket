import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import CommunicationDetail from '../components/detail/communicationDetail'

const mapStateToProps= (state) => {
    return {
        userInfo: state.user,
    }
}

function CommunicationDetailContainer (props) {
    const { userInfo, navigation } = props
    return (
        <CommunicationDetail userInfo={userInfo} navigation={navigation} />
    )
}

export default connect(
    mapStateToProps
  )(CommunicationDetailContainer)