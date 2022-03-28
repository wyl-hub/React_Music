import * as actionTypes from './constans'
import * as playerService from '@/services/playerService'
import { formatLyc } from '@/utils/format'

export const getSongDetail = ids => {
    return async dispatch => {
        const res = await playerService.getSongDetail(ids)
        const data = res.data.songs[0]
        getLyric(dispatch, data.id)
        dispatch({
            type: actionTypes.GET_SONGDETAIL,
            data
        })
    }
}


export const getLyric = async (dispatch, id) => {
        const res = await playerService.getSongLyric(id)
        const lrc = res.data.lrc.lyric
        const arr = lrc.split('\n')
        const lyricList = formatLyc(arr)
        dispatch({
            type: actionTypes.GET_LYRIC,
            data: lyricList
        })
}