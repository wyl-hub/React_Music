import * as actionTypes from './constans'
import * as albumService from '@/services/albumService'

export const getAlbumDetailAction = id => {
    return dispatch => {
        albumService.getAlbumDetail(id).then(res => {
            const { songs, album } = res.data
            dispatch({
                type: actionTypes.GET_ALBUM,
                data: album
            })
            dispatch({
                type: actionTypes.GET_SONG,
                data: songs
            })
        })
    }
}