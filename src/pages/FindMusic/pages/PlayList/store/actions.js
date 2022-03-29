import * as playlistService from '@/services/playlistService'
import * as playerService from '@/services/playerService'
import * as actionTypes from './constans'

export function getListDetail(id) {
    return async dispatch => {
        const res = await playlistService.getPlayListDetail(id)
        const { playlist } = res.data
        // 每个歌单有很多歌  只取前十个
        const songList = playlist.trackIds.splice(0, 10)
        // 获取每一首歌的详情
        getSongList(songList, dispatch)
        
        dispatch({
            type: actionTypes.GET_PLAYLIST,
            data: playlist
        })
    }
}

export function getSongList(arr, dispatch) {
    let songList = []
    const promiseArr = arr.map(item => playerService.getSongDetail(item.id))
    Promise.all(promiseArr).then(res => {
        res.forEach(item => {
            songList.push(item.data.songs[0])
        })
        dispatch({
            type: actionTypes.SPLICE_SONGLIST,
            data: songList
        })
    })
}