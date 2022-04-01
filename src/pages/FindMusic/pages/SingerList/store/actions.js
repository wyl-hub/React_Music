import * as singerlistService from '@/services/singerlistService'
import * as actionTypes from './constans'

export const getSingerlist = (offset) => {
    return dispatch => {
        singerlistService.getSingerList(offset, 1).then(res => {
            const { artists } = res.data
            dispatch({
                type: actionTypes.GET_CHINESESINGER_1,
                data: artists
            })
        })
        singerlistService.getSingerList(offset, 2).then(res => {
            const { artists } = res.data
            dispatch({
                type: actionTypes.GET_CHINESESINGER_2,
                data: artists
            })
        })
    }
}