import React from 'react';
import { 
	View,
	SafeAreaView, 
	Text, 
	TouchableOpacity,
	StyleSheet, 
	FlatList,
	Image,
} from 'react-native';
import { width } from '../../config/device'
import { NavigationScreenProp } from 'react-navigation'
import { UserState } from '../../store/reducers/user'
import api from '../../api/'
import { autoAlert, guid } from '../../common/'
import { Image as ImageType } from 'react-native-image-crop-picker'

export interface Props{
	navigation: NavigationScreenProp<any>,
	user: UserState
}

export default function Publish(props: Props)  {
	const { navigation, user } = props
	let file, formData = new FormData()
	const data = [
        {
			key: 'publish_tiezi', 
			title: '发帖子', 
			canChoseImg: true,
			initdata: {
				title: '',
				type: 0
			},
			fields: [
				{
					key: 'type',
					type: 1,
					items: [
						{
							label: '求助',
							value: 0
						},
						{
							label: '交友',
							value: 1
						}
					]
				},
				{
					placeholder: '这里添加标题',
					key: 'title',
					type:0
				}
			],
			publish: (content:string, fieldData:any, imageList: Array<ImageType>) => {
				if(imageList.length){
					let image = imageList[0]
					file = { uri:image.path, type:image.mime, size:image.size, name: guid() }
					formData.append('file', file)
					formData.append('img_width', String(image.width))
					formData.append('img_height', String(image.height))
				}
				formData.append('title', fieldData.title)
				formData.append('type', fieldData.type)
				formData.append('text', content)
				formData.append('publish_user', user.Id)
				return api.chat.add(formData)
				.then(res => res.json())
				.then(response => {
					autoAlert(() => {
						return response.msg
					},() => {
						if(response.status != 200){
							return response.msg
						}
					}).then(() => {
						(navigation as any).pop()
					})
				})
			}
		},
        {
			key: 'publish_jobs',
			title: '发招聘', 
			canChoseImg: true,
			initdata:{
				job_pay: '',
				job_name: ''
			},
			fields: [
				{
					placeholder: '这里添加工作名称',
					key: 'job_name',
					type:0
				},
				{
					placeholder: '这里添加月薪',
					key: 'job_pay',
					type:0
				}
			],
			publish: (content:string, fieldData:any) => {
				let job = Object.assign(fieldData,{
					publish_user: user.Id,
					job_detail: content
				})
				return api.job.add(job)
				.then(res => res.json())
				.then(response => {
					autoAlert(() => {
						return '发布成功'
					}, () => {
						if(response.status != 200){
							return response.msg
						}
					}).then(() => {
						(navigation as any).pop()
					})
				})
			}
		},
		{
			key: 'publish_second', 
			canChoseImg: true,
			title: '二手转让', 
			initdata: {
				price: '',
				title: ''
			},
			fields: [
				{
					placeholder: '这里添加标题',
					key: 'title',
					type:0
				},
				{
					placeholder: '这里添加出售价格',
					key: 'price',
					type:0
				}
			],
			publish: (content:string, fieldData:any, imageList: Array<ImageType>) => {
				if(imageList.length){
					for(let i=0;i<imageList.length;i++){
						let image = imageList[i]
						file = { uri:image.path, type:image.mime, size:image.size, name: guid() }
						formData.append(`file${i}`, file)
						formData.append(`img_width_${file.name}`, String(image.width))
						formData.append(`img_height_${file.name}`, String(image.height))
					}
				}
				formData.append('detail', content)
				formData.append('publish_user', user.Id)
				formData.append('price', fieldData.price)
				formData.append('title', fieldData.title)
				return api.secondHand.add(formData)
				.then(res => res.json())
				.then(response => {
					autoAlert(() => {
						return '发布成功'
					}, () => {
						if(response.status != 200){
							return response.msg
						}
					}).then(() => {
						(navigation as any).pop()
					})
				})
			}
		},
	]
	const jumpToEditPage = ({initdata, fields, publish, canChoseImg}:any) => {
        navigation.navigate('EditInput',{
            initdata,
            fields,
			publish,
			canChoseImg
        })
    }
	const _renderItem = (data:any) => {
		return (
			<TouchableOpacity 
				style={styles.item} 
				onPress={() => jumpToEditPage(data.item)}
				>
				<Image 
					source={{uri: data.item.key}}
					style={{width: 57, height: 57}}
					/>
				<Text>{data.item.title}</Text>
			</TouchableOpacity>
		)
    }
    const _goDetail = (item:any) => {
		const {navigation} = props;
		navigation.goBack();
		navigation.navigate(item.url, {title: item.title});
	}
    return (
        <SafeAreaView style= {styles.container}>
                <View style={styles.flat}>
                    <FlatList
                        data={data}
                        renderItem={(item) => _renderItem(item)}
                        numColumns={3}
                        scrollEnabled={false}
                        />
                </View>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => props.navigation.goBack()}
                    >
                    <Text>取消</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flat: {
		width,
	},
	item: {
		flex: 1,
		height: 100,  
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	button: {
		width,
		height: 50,
		position: 'absolute',
		bottom: 0,
		backgroundColor:'#fff',
		justifyContent: 'center', 
		alignItems: 'center', 
	},
})