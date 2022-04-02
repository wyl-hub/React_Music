import * as singerService from '@/services/singerService'
import * as actionTypes from './constans'


export const getSingerDetailAction = id => {
    return dispatch => {
        if (id) {
            singerService.getSingerDetail(id).then(res => {
                const { artist = {}, hotSongs = [] } = res.data
                dispatch({
                    type: actionTypes.GET_SINGERDETAIL,
                    data: artist
                })
                dispatch({
                    type: actionTypes.GET_SINGERHOTSONG,
                    data: hotSongs
                })
            })
        } else {
            dispatch({
                type: actionTypes.GET_SINGERDETAIL,
                data: {}
            })
            dispatch({
                type: actionTypes.GET_SINGERHOTSONG,
                data: []
            })
        }
    }
}
