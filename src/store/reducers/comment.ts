import actionType from '../actions/actionType'
import { UpdateComments } from '../actions/index'

const initState = {
    Id:'',
    chat_id:'',
    content:'',
    like_cnt:'',
    publish_user_name:'',
    reply_user_name:'',
    publish_time:''
}

export interface CommentState {
    Id:string,
    chat_id?:string,
    content?:string,
    like_cnt?:string,
    publish_user_name?:string,
    reply_user_name?:string,
    publish_time?:string
}
type Actions = UpdateComments
const updateComments =  (state:CommentState = initState, action:Actions) => {
    switch (action.type) {
        case actionType.UPDATE_COMMENTS:
            return Object.assign({},state,action.comments)
        default :
            return state
    }
}
export default updateComments