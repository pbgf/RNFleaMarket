export interface ChatState {
    Id?:string,
    title?:string,
    text?:string,
    img?:string,
    img_width?:string,
    img_height?:string,
    like_cnt?:string,
    comment_cnt?:string,
    publish_user?:string,
    publish_time?:string
}

export interface Img {
    url:string,
    width:string,
    height:string
}

export interface User {
    user_name:string,
    icon:string
}

export interface ChatBeautify {
    Id:string,
    title?:string,
    text?:string,
    img?:Img,
    img_width?:string,
    img_height?:string,
    like_cnt?:string,
    comment_cnt?:string,
    publish_user?:string,
    user?:User,
    publish_time?:string
}
