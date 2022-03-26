import * as actionTypes from './constans'

export function getAudioDom(dom) {
    return {
        type: actionTypes.GET_AUDIODOM,
        data: dom
    }
}

export function changePlayStatus(data) {
    return {
        type: actionTypes.CHANGE_PLAYSTATUS,
        data
    }
}

export function setCurrentSong(data) {
    return {
        type: actionTypes.SET_CURRENTSONG,
        data
    }
}

export function setVoice(data) {
    return {
        type: actionTypes.OPEN_VOICE,
        data
    }
}

export function addPlayList(arr) {
    return (dispatch, getState) => {
        let { playList } = getState().audio
        // 去重
        // 增加单曲
        if (playList.length > 0) {
            if (arr.length === 1) {
                playList.some((item, ind) => {
                    if (item.id === arr[0].id) return true
                    else if (ind === playList.length - 1) {
                        playList.push(arr[0])
                    }
                })
            }
        } else {
            playList = arr
        }
        dispatch({
            type: actionTypes.ADD_PLAYLIST,
            data: playList
        })
    }
}