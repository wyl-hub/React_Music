import * as actionTypes from './constans'

const initState = {
    artist: {},
    hotSong: []
}

export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_SINGERDETAIL:
            return { ...state, artist: action.data }
        case actionTypes.GET_SINGERHOTSONG:
            return { ...state, hotSong: action.data }
        default:
            return state
    }
}