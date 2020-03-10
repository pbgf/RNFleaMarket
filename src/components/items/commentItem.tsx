import React, { Component } from 'react'
import {  
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Image
} from 'react-native';
import Like from '../base/like'
import { base_path } from '../../api/'

export interface Props {
    item: any
}

export default function CommentItem (props: Props) {
    // const _onPressUser = (user) => {
    //     const { onPressUser } = props;
    //     onPressUser && onPressUser(user);
    // }

    const _renderHeader = () => {
        const { item } = props
        return (
            <View style={{flex:1,flexDirection: 'row',justifyContent:'space-between',alignItems: 'center'}}>
                <TouchableOpacity 
                    // onPress={() => this._onPressUser(item.u)}
                    style={styles.itemHeader}>
                    <Image 
                        source={{uri: base_path + '/file/' + item.user.icon}}
                        style={styles.headerUser}
                        />
                    <View style={styles.headerName}>
                        <Text style={{fontSize: 12, color: '#0073c1'}}>{item.user.user_name}</Text>
                        <Text style={{fontSize: 10, color: '#333'}}>{item.publish_time}</Text>
                    </View>
                </TouchableOpacity>
                <Like likeCnt={100} />
            </View>
        )
    }

    const _renderContent = () => {
        const { item } = props
        return (
            <TouchableOpacity 
                onPress={() => _onPressContent(item)}
                style={styles.itemContent}
                >
                <Text>{item.content}</Text>
            </TouchableOpacity>
        )
    }

    const _onPressContent = (item: any) => {
        const { onPressContent } = props
        onPressContent && onPressContent(item);
    }

    return (
        <View style={styles.item}>
            {_renderHeader()}
            {_renderContent()}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 10,
    },
    itemHeader: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerUser: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        marginHorizontal: 10
    },
    headerName: {
        marginLeft: 10, 
        justifyContent: 'space-evenly', 
        height: 50
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
    itemText: {
        marginBottom: 10,
        fontSize: 12,
    },
})

// CommentItem.propTypes = {
//     item: PropTypes.object.isRequired,
//     onPressUser: PropTypes.func,
//     onPressContent: PropTypes.func,
// }
