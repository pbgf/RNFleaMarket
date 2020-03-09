import actionType from '../actions/actionType'
import { UpdateJobs } from '../actions/index'

const initState = [{}]

export interface JobState {
    job_name?:string
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