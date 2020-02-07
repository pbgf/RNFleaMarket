// import axios from 'react-native-axios'

//const base_path = '120.79.46.144:3000'
const base_path = 'http://192.168.1.7:3000/api'
// const $http = axios.create({
//     baseURL: base_path
// })
export default {
    upload: (formData) => fetch(base_path + '/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    }),
    user:{
        register: (formData) => fetch(base_path + '/users/register',{
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        login: (user) => fetch(base_path + '/users/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
    },
    comment:{
        queryByCm: (id) => fetch(base_path + '/comments/byCommunication/'+id,{
            method: 'GET'
        }) //queryByCommunication
    },
    home:{

    }
}
