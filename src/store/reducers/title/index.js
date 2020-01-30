import actionType from '../../actions/actionType'
const initState = {
    title: '校园跳蚤市场'
}

const updateTitle =  (state = initState, action) => {
    switch (action.type) {
        case actionType.TITLE_UPDATE:
            return Object.assign({},state,{
                title:action.title
            })
        default :
            return state
    }
}
export default updateTitle