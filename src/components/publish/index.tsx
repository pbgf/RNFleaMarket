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
			initdata: {
				title: '',
			},
			fields: [
				{
					placeholder: '这里添加标题',
					key: 'title'
				}
			],
			publish: (content:string, fieldData:any, image: ImageType) => {
				file = { uri:image.path, type:image.mime, size:image.size, name: guid() }
				formData.append('file', file)
				formData.append('title', fieldData.title)
				formData.append('text', content)
				formData.append('img_width', image.width)
				formData.append('img_height', image.height)
				formData.append('publish_user', user.user_name)
				api.chat.add(formData)
				.then(res => res.json())
				.then(response => {
					autoAlert(() => {
						return response.msg
					},() => {
						if(response.status != 200){
							return response.msg
						}
					}).then(() => {
						navigation.goBack()
					})
				})
			}
		},
        {
			key: 'publish_jobs',
			title: '发招聘', 
			initdata:{
				job_pay: '',
				job_name: ''
			},
			fields: [
				{
					placeholder: '这里添加工作名称',
					key: 'job_name'
				},
				{
					placeholder: '这里添加月薪',
					key: 'job_pay'
				}
			],
			publish: (content:string, fieldData:any) => {
				let job = Object.assign(fieldData,{
					publish_user: user.user_name,
					job_detail: content
				})
				api.job.add(job)
				.then(res => res.json())
				.then(response => {
					autoAlert(() => {
						return '发布成功'
					}, () => {
						if(response.status != 200){
							return response.msg
						}
					}).then(() => {
						navigation.navigate('Publish')
					})
				})
			}
		},
		{key: 'publish_second', title: '二手转让', url:'SalePublish'},
	]
	const jumpToEditPage = ({initdata, fields, publish}:any) => {
        navigation.navigate('EditInput',{
            initdata,
            fields,
            publish,
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