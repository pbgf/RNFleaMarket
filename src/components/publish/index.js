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

export default function Publish(props)  {
	const data = [
        {key: 'publish_tiezi', title: '发帖子', url:'PostPublish'},
        {key: 'publish_jobs', title: '发招聘', url:'JobPublish'},
		{key: 'publish_second', title: '二手转让', url:'SalePublish'},
	]

	const _renderItem = (data) => {
		return (
			<TouchableOpacity 
				style={styles.item} 
				onPress={() => _goDetail(data.item)}
				>
				<Image 
					source={{uri: data.item.key}}
					style={{width: 57, height: 57}}
					/>
				<Text>{data.item.title}</Text>
			</TouchableOpacity>
		)
    }
    const _goDetail = (item) => {
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