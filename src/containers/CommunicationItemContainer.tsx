import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import CommunicationItem from '../components/items/communicationItem'
import { NavigationScreenProp } from 'react-navigation'
import { State } from '../store/reducers/'
import { UserState } from '../store/reducers/user'

const mapStateToProps = ({user}:State) => {
    return {
        userInfo: user,
    }
}

export interface Props {
    navigation: NavigationScreenProp<any>,
    userInfo: UserState,
    item: any
}

function CommunicationItemContainer (props:Props) {
    const { userInfo, item , navigation } = props
    return (
        <CommunicationItem 
            userInfo={userInfo}  
            navigation={navigation} 
            item={item}
            />
    )
}

export default connect(
    mapStateToProps,
  )(CommunicationItemContainer)
