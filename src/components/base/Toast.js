import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import {
    View,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native'

const {height, width} = Dimensions.get('window');

const defaultConfig = {
    fadeInDuration: 500,
    fadeOutDuration: 1000,
    opacity: 1,
}

const defaultProps = {
    position: 'center',
    textStyle: {
        color: 'white'
    }
}

let timer, animation
function Toast (props = defaultProps, ref) {
    const [state, setState] = useState({
        isShow: false,
        text: ''
    })
    const [opacityValue] = useState(new Animated.Value(defaultConfig.opacity))
    const close = function (callback) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            animation = Animated.timing(
                opacityValue,
                {
                    toValue: 0.0,
                    duration: defaultConfig.fadeOutDuration,
                }
            )
            animation.start(() => {
                setState({
                    isShow:false
                })
                callback && callback()
                animation.reset()
            })
        })
    }
    useEffect(() => {
        return function cleanup() {
            timer && clearTimeout(timer)
            animation && animation.stop()
        }
    },[])
    useImperativeHandle(ref, () => ({
        show: (text, callback) => {
            setState({
                isShow: true,
                text: text
            })
            animation = Animated.timing(
                opacityValue,
                {
                    toValue: 1,
                    duration: defaultConfig.fadeInDuration,
                }
            )
            animation.start(() => {
                close(callback)
            })
        }
    }))
    return (
        <View style={styles.container}>
            {state.isShow?
                <Animated.View style={{...styles.content, opacity:opacityValue}}>
                    <Text style={styles.text}>{state.text?state.text:'hello'}</Text>
                </Animated.View>
            :null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        position: 'absolute',
        top: height/2,
        zIndex: 10000,
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10
    },
    text: {
        color:'white'
    }
})

export default forwardRef(Toast)
