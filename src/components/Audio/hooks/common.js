import { changePlayStatus } from '../store/actions'
// 播放音乐
export const playMusic = (dispatch, audioDom, currentSong) => {
    return () => {
        if (JSON.stringify(currentSong) === '{}') return
        dispatch(changePlayStatus(true))
        audioDom.current.play()
    }
}

// 暂停音乐
export const pauseMusic = (dispatch, audioDom, currentSong) => {
    return () => {
        if (JSON.stringify(currentSong) === '{}') return
        dispatch(changePlayStatus(false))
        audioDom.current.pause()
    }
}