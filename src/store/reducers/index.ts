import user from './user';
import jobs from './job'
import refs from './ref'
import { combineReducers } from 'redux';
import { JobState } from './job'
import { UserState } from './user'
import { Refs } from './ref'

export default combineReducers({
    user,
    jobs,
    refs
})

export interface State {
    user:UserState,
    jobs:Array<JobState>,
    refs:Refs
}