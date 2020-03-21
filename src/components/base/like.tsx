import React, { useState } from 'react'
import {
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native'
import api from '../../api'

export interface Props {
    id?:string,
    likedUser?:object,
    likeCnt:number,
    addCnt: (cnt:number) => void,
    minusCnt: (cnt:number) => void
}

export default function (props:Props) {
    const { id, likedUser, addCnt, minusCnt } = props
    const [isLike,setIsLike] = useState(false)
    const [likeCnt,setLikeCnt] = useState(props.likeCnt)
    const [timer,setTimer] = useState(0)
    const [isEmit,setIsEmit] = useState(false)
    return (
        <TouchableOpacity style={styles.iconContainer} activeOpacity={1} onPress={()=>{
                setIsLike(!isLike)
                if(!isLike){
                    setLikeCnt(likeCnt+1)
                    setTimer(setTimeout(() => {
                        console.log('request')
                        addCnt(likeCnt+1)
                        setIsEmit(true)
                    },3000))
                }else{
                    setLikeCnt(likeCnt-1)
                    if(isEmit){
                        console.log('cnt--')
                        minusCnt(likeCnt-1)
                    }else{
                        clearTimeout(timer)
                    }
                }
            }}>
            {isLike?<Image style={styles.IconItem} source={{uri:'like_filled'}} />:<Image style={styles.IconItem} source={{uri:'like'}}/>}
            <Text>{likeCnt}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconContainer:{
        flexDirection:'row',
        paddingTop:5,
        paddingBottom:5
    },
    IconItem:{
        width:20,
        height:20,
        marginHorizontal:5,
    }
})
