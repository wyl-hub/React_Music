import * as albumlistService from '@/services/albumlistService'
import * as actionTypes from './constans'

export const getAlbumByPageAction = offset => {
  return dispatch => {
    albumlistService.getAlbumByPage(offset).then(res => {
      dispatch({
        type: actionTypes.GET_ALBUM_BYPAGE,
        data: res.data
      })
    })
  }
}