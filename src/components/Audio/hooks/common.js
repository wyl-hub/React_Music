import { changePlayStatus, setCurrentSong, addPlayList, setPlayList, getCurrentLyc } from '../store/actions'
import { formatLyc } from '@/utils/format'
import * as playerService from '@/services/playerService'

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

// 获取当前播放歌曲的歌词
export const getCurrentLrc = (dispatch, id) => {
    playerService.getSongLyric(id).then(res => {
        const lrc = res.data.lrc.lyric
        const arr = lrc.split('\n')
        const lyricList = formatLyc(arr)
        dispatch(getCurrentLyc(lyricList))
    })
}

// 传入新歌曲资源并播放
export const playNewMusic = (dispatch, audioDom, newSong) => {
    return () => {
        if (JSON.stringify(newSong) === '{}') return
        const url = `https://music.163.com/song/media/outer/url?id=${newSong.id}.mp3`
        if (url !== audioDom.current.src) dispatch(addPlayList([newSong]))
        audioDom.current.src = url
        audioDom.current.load()
        audioDom.current.play()
        getCurrentLrc(dispatch, newSong.id)
        dispatch(changePlayStatus(true))
        dispatch(setCurrentSong(newSong))
    }
}

// 播放列表中移除某歌曲
export const removeMusic = (dispatch, playList, aimSong) => {
    const newArr = playList.filter(item => item.id !== aimSong.id)
    dispatch(setPlayList(newArr))
}

// 上一首
export const changeMusic = (dispatch, audioDom, playList, currentSong, type) => {
    return () => {
        let aim = {}
        if (playList.length === 1) aim = currentSong
        else {
            playList.some((item, index) => {
                if (item.id === currentSong.id) {
                    if (type === 'last') {
                        if (index === 0) aim = playList[playList.length - 1]
                        else aim = playList[index - 1]
                    }
                    if (type === 'next') {
                        if (index === playList.length - 1) aim = playList[0]
                        else aim = playList[index + 1]
                    }
                    return true
                }
            })
        }
        playNewMusic(dispatch, audioDom, aim)()
    }
}
