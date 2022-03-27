import * as actionTypes from './constans'
const initState = {
    playlist: {},
    songList: []
}

export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_PLAYLIST:
            return { ...state, playlist: action.data }
        case actionTypes.SPLICE_SONGLIST:
            return { ...state, songList: action.data }
        default:
            return state
    }
}