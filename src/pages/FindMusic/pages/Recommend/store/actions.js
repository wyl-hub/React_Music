import actionTypes from './constans'
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