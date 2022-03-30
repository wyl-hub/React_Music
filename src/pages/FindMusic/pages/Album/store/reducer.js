import * as actionTypes from './constans'

const initState = {
    albumInfo: {},
    songs: []
}

export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_ALBUM:
            return { ...state, albumInfo: action.data }
        case actionTypes.GET_SONG:
            return { ...state, songs: action.data }
        default:
            return state
    }
}