import { changePlayStatus, setCurrentSong, addPlayList, setPlayList, getCurrentLyc } from '../store/actions'
import { formatLyc } from '@/utils/format'
import * as playerService from '@/services/playerService'

// 播放音乐
export const playMusic = (dispatch, audioDom, currentSong) => {
    return () => {
        if (JSON.stringify(currentSong) === '{}') return
        dispatch(changePlayStatus(true))
        audioDom.current.play().catch(err => {
            alert('要VIP 我这放不了')
        })
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
export const playNewMusic = (dispatch, audioDom, newSong, songList = []) => {
    return () => {
        if (JSON.stringify(newSong) === '{}') return
        let url = ''
        if (songList.length > 0) url = `https://music.163.com/song/media/outer/url?id=${songList[0].id}.mp3`
        else url = `https://music.163.com/song/media/outer/url?id=${newSong.id}.mp3`
        audioDom.current.src = url
        audioDom.current.load()
        setTimeout(() => {
            audioDom.current.play().then(res => {
                dispatch(changePlayStatus(true))
                if (songList.length > 0) {
                    dispatch(addPlayList(songList))
                    getCurrentLrc(dispatch, songList[0].id)
                    dispatch(setCurrentSong(songList[0]))
                } else {
                    dispatch(addPlayList([newSong]))
                    getCurrentLrc(dispatch, newSong.id)
                    dispatch(setCurrentSong(newSong))
                }
            }).catch(err => {
                alert('要VIP 我这放不了')
            })
        }, 300)
    }
}

// 播放列表中移除某歌曲
export const removeMusic = (dispatch, playList, aimSong) => {
    const newArr = playList.filter(item => item.id !== aimSong.id)
    dispatch(setPlayList(newArr))
}

// 上一首
export const changeMusic = (dispatch, audioDom, playList, currentSong, type, rule = '') => {
    return () => {
        let aim = {}
        if (playList.length === 1) aim = currentSong
        else {
            playList.some((item, index) => {
                if (item.id === currentSong.id) {
                    // 单曲循环 随机播放
                    if (rule && rule !== 'loop') {
                        if (rule === 'singLoop') aim = currentSong
                        if (rule === 'random') {
                            let ind = index
                            while (ind === index) {
                                ind = Math.floor(Math.random() * (playList.length))
                            }
                            aim = playList[ind]
                        }
                    } else {
                        if (type === 'last') {
                            if (index === 0) aim = playList[playList.length - 1]
                            else aim = playList[index - 1]
                        }
                        if (type === 'next') {
                            if (index === playList.length - 1) aim = playList[0]
                            else aim = playList[index + 1]
                        }
                    }
                    return true
                }
            })
        }
        playNewMusic(dispatch, audioDom, aim)()
    }
}
