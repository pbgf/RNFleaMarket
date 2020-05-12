import actionType from '../actions/actionType'
import { UpdateJobs } from '../actions/index'
import { Img } from './chat'

const initState = [{
    Id: '',
    job_name: '',
    job_pay: '',
    job_detail: '',
    publish_time: '',
    publish_user: ''
}]

export interface JobState {
    Id: string,
    job_name?: string,
    job_pay?: string,
    job_detail?: string,
    publish_time?: string,
    publish_user?: string,
    user_name?:string,
    imgList?:Array<Img>
}

type Actions = UpdateJobs

const updateJobs =  (state:Array<JobState> = initState, action:Actions) => {
    switch (action.type) {
        case actionType.UPDATE_JOBS:
            return Object.assign([],state,action.jobs)
        default :
            return state
    }
}
export default updateJobs