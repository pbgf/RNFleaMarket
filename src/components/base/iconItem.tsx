import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

export interface Props{
    pressEvent:() => void,
    url:string
}

export default function (props:Props) {
    const { pressEvent, url } = props
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={pressEvent}>
            <Image style={styles.icon} source={{uri:url}} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width:20,
        height:20
    },
    icon:{
        width:20,
        height:20
    }
})
