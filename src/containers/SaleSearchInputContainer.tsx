import { connect } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import SearchInput from '../components/base/searchInput'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import {
    saveUserInfo
} from '../store/actions/index'
import { State } from '../store/reducers/'
import { Refs } from '../store/reducers/ref'

const mapStateToProps = ({refs}:State) => {
    return {
        refs,
    }
}

export interface Props { 
    dispatch: Function,
    refs: Refs
}

function SearchInputContainer (props:Props) {
    return (
        <SearchInput myRef={props.refs.secondListRef} />
    )
}

export default connect(
    mapStateToProps,
)(SearchInputContainer)