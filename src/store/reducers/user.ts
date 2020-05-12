import actionType from '../actions/actionType'
import { SaveUserInfo } from '../actions/index'

export const initState = {
    Id:'',
    user_name:'',
    pass_word:'',
    telephone:'',
    qq:'',
    icon:'',
    sex:1,
    like_cnt: 0,
    money: 0
}

export interface UserState {
    Id:string,
    user_name?:string,
    pass_word?:string,
    telephone?:string,
    qq?:string,
    icon?:string,
    like_cnt?:number,
    sex?:number,
    [key:string]:any,
    money?:number
}
type Actions = SaveUserInfo
const saveUser =  (state:UserState = initState, action:Actions) => {
    switch (action.type) {
        case actionType.SAVE_USER:
            return Object.assign({},state,action.user)
        default :
            return state
    }
}
export default saveUser