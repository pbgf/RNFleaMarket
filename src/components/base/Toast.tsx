import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import {
    View,
    Text,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native'
import { _get } from '../../common/index'

const {height, width} = Dimensions.get('window');

const defaultConfig = {
    fadeInDuration: 200,
    fadeOutDuration: 1000,
    opacity: 1,
}

const defaultProps = {
    position: 'center',
    textStyle: {
        color: 'white'
    }
}

export interface Props {
    position?: string,
    textStyle?: {
        color:string
    }
}

let timer:number, animation:Animated.CompositeAnimation
function Toast (props:Props = defaultProps, ref:React.Ref<any>) {
    const [state, setState] = useState({
        isShow: false,
        text: ''
    })
    const [opacityValue] = useState(new Animated.Value(defaultConfig.opacity))
    const close = function (callback:Function) {
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
                    isShow:false,
                    text: state.text
                })
                callback && callback()
                _get<Function>(animation, 'reset', () => {})()
                //animation.reset()
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
        show: (text:string, callback:() => void) => {
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
        display:'flex',
        alignItems:'center',
        position: 'absolute',
        top: height/2 - 20,
        zIndex: 10000,
        width:'100%'
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
