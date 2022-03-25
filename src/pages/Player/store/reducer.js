import * as actionTypes from './constans'

const initState = {
    songDetail: {}
}

export default function(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_SONGDETAIL:
            return { ...state, songDetail: action.data }
        default:
            return state
    }
}
