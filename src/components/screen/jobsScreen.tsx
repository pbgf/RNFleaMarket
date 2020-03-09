import React, { useState, useEffect, Component }  from 'react';
import { 
    Text, 
    View, 
    FlatList,
    ActivityIndicator
} from 'react-native';
import JobItem from '../items/jobItem'
import api from '../../api/'

export interface Item {
    Id:string,
    job_name:string,
    job_pay:string,
    job_detail:string,
    publish_time:string,
    publish_user:string
}

export default function JobScreen (props:any) {
    const [lists,setLists] = useState<Item[]>([])
    const [isLoad,setIsLoad] = useState(false)
    useEffect(()=>{
        api.job.query()
        .then(res => res.json())
        .then(response => {
            setLists(response.result)
            setIsLoad(true)
        })
    },[])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoad?<FlatList 
                style={{width:'100%'}}
                data={lists}
                renderItem={ ({item}) => 
                    <JobItem 
                    item={item}
                    navigation={props.navigation}  />
                }/>:<ActivityIndicator size="large" color="#e20000" />
            }
        </View>
    );
}
