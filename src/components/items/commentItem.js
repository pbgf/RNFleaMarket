import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class CommentItem extends Component {
    render() {
        
        return (
            <View style={styles.item}>
                {this._renderContent()}
            </View>
        )
    }

    _onPressUser = (user) => {
        const { onPressUser } = this.props;
        onPressUser && onPressUser(user);
    }

    _renderContent = () => {
        const { item } = this.props;
        return (
            <TouchableOpacity 
                onPress={() => this._onPressContent(item)}
                style={styles.itemContent}
                >
                <Text>{item.content}</Text>
            </TouchableOpacity>
        )
    }

    _onPressContent = (item) => {
        const { onPressContent } = this.props;
        onPressContent && onPressContent(item);
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
    },
    itemHeader: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemUser: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemSupport: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    itemContent: {
        margin: 10, 
        marginLeft: 60,
    },
    itemPlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -35,
        marginTop: -35,
        width: 70, 
        height: 70,
    },
})

CommentItem.propTypes = {
    item: PropTypes.object.isRequired,
    onPressUser: PropTypes.func,
    onPressContent: PropTypes.func,
}
