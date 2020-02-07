import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import CommunicationItem from '../components/items/communicationItem'

const mapStateToProps = (state) => {
    return {
        userInfo: state.user,
    }
}

function CommunicationItemContainer (props) {
    const { userInfo, id, publishUser, publishTime, img, text, navigation } = props
    return (
        <View style={{flex:1}}>
            <CommunicationItem 
                userInfo={userInfo}  
                navigation={navigation} 
                publishUser={publishUser}
                publishTime={publishTime}
                img={img}
                text={text}
                id={id}
                />
        </View>
    )
}

export default connect(
    mapStateToProps,
  )(CommunicationItemContainer)
