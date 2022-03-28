import * as actionTypes from './constans'

const initState = {
    songDetail: {},
    lrc: []
}

export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_SONGDETAIL:
            return { ...state, songDetail: action.data }
        case actionTypes.GET_LYRIC:
            return { ...state, lrc: action.data }
        default:
            return state
    }
}
