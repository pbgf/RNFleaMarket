import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
export default function myButton (props) {
    const { title, backgroundColor, onPress, isRadius, width, height, color } = props
    let buttonStyle = Object.assign(
        {
            alignItems: 'center',
            justifyContent:'center',
            padding: 10
        },
        {
            backgroundColor: backgroundColor,
            width:width,
            height:height,
        }
    )
    if (isRadius) {
        buttonStyle = Object.assign(buttonStyle,
            {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
            }
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={
                    buttonStyle
                }
                activeOpacity={0.7}
                onPress={onPress}
            >
                <Text style={color?color:{color:'white'}}> {title} </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical:5
    },
})
