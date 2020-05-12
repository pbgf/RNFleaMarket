import { SecondHandState } from './secondHand'
import { UserState } from './user'
export interface OrderBeautiful {
    Id:string,
    create_user?:string,
    state?:string,
    merchant?:string,
    money?:string,
    s_id?:string,
    create_time?:string,
    secondHand?:SecondHandState,
    user?:UserState,
    merchant_user?:UserState
}