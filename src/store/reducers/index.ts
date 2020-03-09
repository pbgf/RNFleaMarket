import user from './user';
import jobs from './job'
import { combineReducers } from 'redux';
import { JobState } from './job'
import { UserState } from './user'

export default combineReducers({
    user,
    jobs
})

export interface State {
    user:UserState,
    jobs:Array<JobState>
}