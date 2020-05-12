import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    Modal,
    Image,
    Picker,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native'
import ImagePicker, { Image as ImageType } from 'react-native-image-crop-picker'
import { NavigationScreenProp } from 'react-navigation'
import { isnullOrUndefined, _get, isnoop } from '../../common/'

interface ImgItemProps{
    source:string,
    onPress:() => void
}

function ImgItem (props:ImgItemProps) {
    const { source, onPress } = props
    return (
        <View style={{position:'relative',width:100,height:100}}>
            <TouchableOpacity onPress={onPress} style={{zIndex:999,width:20,height:20,position:'absolute',top:-5,right:-5}}>
                <Image 
                source={{uri:'xx'}}
                style={{width:20,height:20}} />
            </TouchableOpacity>
            <Image 
            source={{uri:source}}
            style={{width:100,height:100}} />
        </View>
    )
}
export interface Field{
    placeholder:string,
    key:string,
    type:number,
    items?:Array<any>
}
export interface Props{
    navigation:NavigationScreenProp<any>,
}
/**
 * 
 * @param props fields:Array<field>
 * data:object
 * field
 */
export default function (props:Props) {
    //const [isChosed,setIsChosed] = useState(false)
    // const [img,setImg] = useState<ImageType | null>(null)
    let timer = 0
    const [imgList, setImgList] = useState<Array<ImageType>>([])
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [modalVisible,setVisible] = useState(false)
    const toast_ref = global.toast_ref
    const { navigation } = props
    const canChoseImg = navigation.getParam('canChoseImg')
    const fields:Array<Field> = navigation.getParam('fields')
    const [state,setState] = useState(navigation.getParam('initdata'))
    const publish:(content:string, state:any, imgList:Array<ImageType>, navigation:NavigationScreenProp<any>) => Promise<any> = navigation.getParam('publish')
    const choseImg = () => {
        if(!canChoseImg){
            global.toast_ref.current.show('这里不能添加图片')
            return ;
        }
        ImagePicker.openPicker({}).then((value:ImageType | ImageType[]) => {
            value = value as ImageType
            setImgList(imgList.concat(value))
            //setImg(value)
            //setIsChosed(true)
        })
    }
    const close = (index:number) => () => {
        // imgList.splice(index,1)
        setImgList(imgList.filter((item,idx) => idx!=index))
        //setIsChosed(false)
    }
    const _publish = () => {
        let flag = 1
        Object.keys(state).forEach((key) => {
            if(isnullOrUndefined(state[key]) || isnoop(state[key])){
                toast_ref.current.show('请填写内容完整')
                flag = 0
            }
        })
        if(isnullOrUndefined(content) || isnoop(content)){
            toast_ref.current.show('请填写内容完整')
            flag = 0
        }
        // if(canChoseImg && isnullOrUndefined(img)){
        //     toast_ref.current.show('请选择图片')
        //     flag = 0
        // }
        if(flag){
            //console.log(imgList)
            setVisible(true)
            publish(content, state, imgList, navigation).finally(() => {
                setVisible(false)
            })
            timer = setTimeout(() => {
                setVisible(false)
            },50000)
        }
        // if(hasTitle){
        //     if(title&&content){
        //         publish && publish()
        //     }else{
        //         toast_ref.current.show('请填写标题和内容')
        //     }
        // }else if(content){
        //     publish && publish()
        // }else{
        //     toast_ref.current.show('请填写内容')
        // }
    }
    useEffect(() => {
        return function cleanup () {
            clearTimeout(timer)
        }
    },[])
    return (
        <View style={styles.container}>
            {
                fields.map((item) => (item.type==0?(
                    <View style={styles.title} key={item.key}>
                        <TextInput 
                        style={[styles.titleInput,styles.textInput]} 
                        underlineColorAndroid={'#b7b6b6'}
                        // editable={hasTitle?true:false}
                        placeholder={item.placeholder}
                        maxLength={10}
                        value={state[item.key]}
                        onChangeText={text => setState(Object.assign({},state,{
                            [item.key]: text
                        }))} />
                    </View>)
                :<Picker 
                    selectedValue={state[item.key]} 
                    style={{width: '100%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        {
                            setState(Object.assign({},state,{
                                [item.key]: itemValue
                            }))
                        }
                    }>
                    <Picker.Item label="求助" value={0} />
                    <Picker.Item label="交友" value={1} />
                </Picker>))
            }
            <View style={styles.content}>
                <TextInput 
                style={[styles.contentInput,styles.textInput]} 
                numberOfLines={20} 
                multiline={true}
                placeholder='这里添加文字，请忽发布色情、政治等违反国家法律的内容'
                maxLength={1000}
                value={content}
                onChangeText={text => setContent(text)} />
            </View>
            <View style={styles.footer}>
                <View style={styles.items}>
                    {imgList.map((img,index) => <ImgItem key={img.modificationDate} source={_get(img, 'path', '')} onPress={close(index)} />)}
                </View>
                <View style={styles.toolBar}>
                    <TouchableOpacity style={styles.imgBtn} onPress={choseImg}>
                        <Image style={styles.imgIcon} source={{uri:'image'}} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={_publish}
                        >
                        <Text>发布</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ width:200,height:150 }}>
                        <ActivityIndicator size="large" color="#e20000"/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        display:'flex',
        width:'100%',
        backgroundColor:'white'
    },
    textInput:{
        padding:5
    },
    title:{
        width:'100%',
        height:50,
        alignItems:'center'
    },
    titleInput:{
        width:'100%',
        height:50
    },
    disabled:{
        display:'none'
    },
    content:{
        width:'100%',
        alignItems:'center'
    },
    contentInput:{
        width:'100%',
        textAlignVertical: 'top',
        height:300
    },
    footer:{
        position:'absolute',
        bottom:0,
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height:200,
        width:'100%'
    },
    items:{
        width:'100%',
        height:150,
        flexDirection: 'row'
    },
    toolBar:{
        height:50,
        width:'100%',
        borderTopColor:'rgba(0, 0, 0, 0.3)',
        borderTopWidth:0.5,
        justifyContent:'center',
        flexDirection:'row'
    },
    imgIcon:{
        width:40,
        height:40
    },
    imgBtn:{
        width:'15%',
        borderRightWidth:0.5,
        borderRightColor:'rgba(0, 0, 0, 0.3)',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        width:'85%',
		height: 50,
		justifyContent: 'center', 
        alignItems: 'center', 
	}
})
