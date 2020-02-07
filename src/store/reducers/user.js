import actionType from '../actions/actionType'
const initState = {
    Id: '',
    user_name:'',
    pass_word:'',
    telephone:'',
    qq:'',
    icon:''
}

const saveUser =  (state = initState, action) => {
    switch (action.type) {
        case actionType.SAVE_USER:
            return Object.assign({},state,action.user)
        default :
            return state
    }
}
export default saveUser