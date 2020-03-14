import { JobState } from '../reducers/job'
import { UserState } from '../reducers/user'
import { CommentState } from '../reducers/comment'
import ActionType from './actionType'

export const saveUserInfo = (user:UserState) => {
    return {
        type: ActionType.SAVE_USER,
        user
    }
}
export const updateJobs = (jobs:Array<JobState>) => {
    return {
        type: ActionType.UPDATE_JOBS,
        jobs
    }
}
export const updateComments = (comments:Array<CommentState>) => {
    return {
        type: ActionType.UPDATE_COMMENTS,
        comments
    }
}

export interface SaveUserInfo {
    type: string,
    user: UserState
}
export interface UpdateJobs {
    type: string,
    jobs: Array<JobState>
}
export interface UpdateComments {
    type: string,
    comments: Array<CommentState>
}