import * as actionTypes from './constans'

const initState = {
    rankDetail: {}
}
export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_RANKDETAIL:
            return { ...state, rankDetail: action.data }
        default:
            return state
    }
}