import actionType from '../actions/actionType'
import { SaveRefs } from '../actions/index'
import { RefObject } from 'react'

const initState = {
    jobListRef: undefined
}

export interface Refs {
    jobListRef?: RefObject<any> | undefined
}
type Actions = SaveRefs
const saveRefs =  (state: Refs = initState, action:Actions) => {
    switch (action.type) {
        case actionType.SAVE_REFS:
            return Object.assign({},state,action.refs)
        default :
            return state
    }
}
export default saveRefs