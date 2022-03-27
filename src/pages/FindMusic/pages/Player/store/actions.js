import * as actionTypes from './constans'
import * as playerService from '@/services/playerService'

export const getSongDetail = ids => {
    return async dispatch => {
        const res = await playerService.getSongDetail(ids)
        const data = res.data.songs[0]
        dispatch({
            type: actionTypes.GET_SONGDETAIL,
            data
        })
    }
}