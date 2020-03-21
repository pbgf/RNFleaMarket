// import axios from 'react-native-axios'

//const base_path = '120.79.46.144:3000'
export const base_path = 'http://192.168.1.6:3000/api'

export interface Param {
    searchKey: string,
    searchVal: string | number
}
export interface Response {
    result: Array<any>,
    status: number,
    msg: string
}
export interface pageParam {
    limit: number,
    offset: number,
    query: string
}
// const $http = axios.create({
//     baseURL: base_path
// })
export default {
    upload: (formData:FormData) => fetch(base_path + '/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    }),
    user:{
        register: (formData:FormData) => fetch(base_path + '/users/register',{
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        login: (user:object) => fetch(base_path + '/users/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }),
        query: (searchKey?:string, searchVal?:string) => fetch(base_path + '/users?' + (searchKey?`${searchKey}=${searchVal}`:''),{
            method:'GET'
        }),
        updateUser: (formData:FormData) => fetch(base_path + '/users/updateUser',{
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
    },
    comment:{
        queryByCm: (id:string) => fetch(base_path + '/comments/byCommunication/'+id,{
            method: 'GET'
        }), //queryByCommunication
        add: (comment:object) => fetch(base_path + '/comments/publishComment',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment)
        }),
        addLikeCnt: (entity:object) => fetch(base_path + '/comments/addLikeCnt',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        }),
        minusLikeCnt: (entity:object) => fetch(base_path + '/comments/minusLikeCnt',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        }),
    },
    chat:{
        query: (searchKey?:string, searchVal?:string) => fetch(base_path + '/chats?' + (searchKey?`${searchKey}=${searchVal}`:''),{
            method:'GET'
        }),
        queryParams: (params:Object) => fetch(base_path + '/chats', { 
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        }),
        add: (formData:FormData) => fetch(base_path + '/chats/publishChat',{
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        addLikeCnt: (entity:object) => fetch(base_path + '/comments/addLikeCnt',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        }),
        minusLikeCnt: (entity:object) => fetch(base_path + '/comments/minusLikeCnt',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entity)
        }),
    },
    job:{
        query: (searchKey?:string, searchVal?:string) => fetch(base_path + '/jobs?' + (searchKey?`${searchKey}=${searchVal}`:''),{
            method:'GET'
        }),
        queryParams: (params:Object) => fetch(base_path + '/jobs', { 
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        }),
        add: (job:object) => fetch(base_path + '/jobs/publishJob',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(job)
        }),
    },
    message:{
        query: (searchKey?:string, searchVal?:string) => fetch(base_path + '/messages?' + (searchKey?`${searchKey}=${searchVal}`:''),{
            method:'GET'
        }),
        queryParams: (params:Object) => fetch(base_path + '/messages', { 
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        }),
    }
}
