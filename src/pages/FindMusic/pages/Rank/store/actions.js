import * as playlistService from '@/services/playlistService'
import * as actionTypes from './constans'

export const getRankDetailAction = id => {
    return dispatch => {
        playlistService.getPlayListDetail(id).then(res => {
            const { playlist } = res.data
            dispatch({
                type: actionTypes.GET_RANKDETAIL,
                data: playlist
            })
        })
    }
}

export const cleanCurrentDetail = () => {
    return {
        type: actionTypes.GET_RANKDETAIL,
        data: {}
    }
}
