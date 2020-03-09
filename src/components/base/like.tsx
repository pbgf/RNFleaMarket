import React, { useState } from 'react'
import {
    TouchableOpacity,
    Image,
    Text,
    StyleSheet
} from 'react-native'

export interface Props {
    id?:string,
    likedUser?:object,
    likeCnt:number
}

export default function (props:Props) {
    const { id, likedUser } = props
    const [isLike,setIsLike] = useState(false)
    const [likeCnt,setLikeCnt] = useState(props.likeCnt)
    return (
        <TouchableOpacity style={styles.iconContainer} activeOpacity={1} onPress={()=>{
                setIsLike(!isLike)
                if(!isLike){
                    setLikeCnt(likeCnt+1)
                }else{
                    setLikeCnt(likeCnt-1)
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
