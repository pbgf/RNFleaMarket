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
    const { user, navigation } = props
    return (
        <View>
            <CommunicationDetail userInfo={userInfo} navigation={navigation} />
        </View>
    )
}

export default connect(
    mapStateToProps
  )(CommunicationDetailContainer)