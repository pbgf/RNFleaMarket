// import axios from 'react-native-axios'

//const base_path = '120.79.46.144:3000'
export const base_path = 'http://192.168.138.17:3000/api'
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
        })
    },
    comment:{
        queryByCm: (id:string) => fetch(base_path + '/comments/byCommunication/'+id,{
            method: 'GET'
        }) //queryByCommunication
    },
    chat:{
        query: (param?:string) => fetch(base_path + '/chats?' + param,{
            method:'GET'
        })
    },
    job:{
        query: (param?:string) => fetch(base_path + '/jobs?' + (param?param:''),{
            method:'GET'
        })
    },
    home:{

    }
}
