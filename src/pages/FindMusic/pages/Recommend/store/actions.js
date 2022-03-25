import * as actionTypes from './constans'
import * as recommendService from '@/services/recommendService'

export const getBannerAction = () => {
  return async dispatch => {
    const result = await recommendService.getBanner()
    const data = result.data
    const { banners = [] } = data
    dispatch({
      type: actionTypes.CHANGE_BANNER,
      data: banners
    })
  }
}


export const getHotList = () => {
  return async dispatch => {
    const res = await recommendService.getHot()
    const { result = [] } = res.data
    dispatch({
      type: actionTypes.CHANGE_HOT,
      data: result
    })
  }
}

export const getAlbum = () => {
  return async dispatch => {
    const res = await recommendService.getNewBorn()
    const { albums = [] } = res.data
    dispatch({
      type: actionTypes.CHANGE_ALBUM,
      data: albums
    })
  }
}

export const getRank = () => {
  return async dispatch => {
    const promiseList = [0, 1, 2].map(item => {
      return recommendService.getRankList(item)
    })
    Promise.all(promiseList).then(res => {
      const rankList = res.map(item => {
        const { playlist } = item.data
        return {
          playlist
        }
      })
      dispatch({
        type: actionTypes.CHANGE_RANK,
        data: rankList
      })
    })
  }
}