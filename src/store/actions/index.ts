import { JobState } from '../reducers/job'
import { UserState } from '../reducers/user'
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

export interface SaveUserInfo {
    type: string,
    user: UserState
}

export interface UpdateJobs {
    type: string,
    jobs: Array<JobState>
}