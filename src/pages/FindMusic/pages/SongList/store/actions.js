import * as songListService from '@/services/songListService'
import * as actionTypes from './constans'

export const getSongListByPageAction = offset => {
  return dispatch => {
    songListService.getSongListByPage(offset).then(res => {
      dispatch({
        type: actionTypes.GET_SONGLIST_BYPAGE,
        data: res.data
      })
    })
  }
}