import * as actionTypes from './constans'
const initState = {
    audioRef: null,
    isPlay: false,
    // 播放列表
    playList: [],
    // 当前播放的音乐
    currentSong: {},
    // 音量调节
    voiceFlag: false
}

export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_AUDIODOM:
            return { ...state, audioRef: action.data }
        case actionTypes.CHANGE_PLAYSTATUS:
            return { ...state, isPlay: action.data }
        case actionTypes.SET_CURRENTSONG:
            return { ...state, currentSong: action.data }
        case actionTypes.ADD_PLAYLIST:
            return { ...state, playList: action.data }
        case actionTypes.OPEN_VOICE:
            return { ...state, voiceFlag: action.data }
        default:
            return state
    }
}