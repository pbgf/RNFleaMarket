import { Img } from './chat'
export interface SecondHandState {
    Id:string,
    title?:string,
    detail:string,
    price?:string,
    publish_time?:string,
    publish_user?:string,
    user_name?:string,
    imgList?:Array<Img>
}