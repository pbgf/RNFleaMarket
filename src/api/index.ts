// import axios from 'react-native-axios'

//const base_path = '120.79.46.144:3000'
export const base_path = 'http://192.168.228.193:3000/api'

export interface Param{
    searchKey: string,
    searchVal: string | number
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
        })
    },
    comment:{
        queryByCm: (id:string) => fetch(base_path + '/comments/byCommunication/'+id,{
            method: 'GET'
        }) //queryByCommunication
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
        })
    },
    job:{
        query: (searchKey?:string, searchVal?:string) => fetch(base_path + '/jobs?' + (searchKey?`${searchKey}=${searchVal}`:''),{
            method:'GET'
        })
    },
    home:{

    }
}
