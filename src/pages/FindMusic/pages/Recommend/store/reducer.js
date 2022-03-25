import * as actionTypes from './constans'

const initState = {
  banner: [],
  hotList: [],
  albumList: [],
  rankList: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return { ...state, banner: action.data }
    case actionTypes.CHANGE_HOT:
      return { ...state, hotList: action.data }
    case actionTypes.CHANGE_ALBUM:
      return { ...state, albumList: action.data }
    case actionTypes.CHANGE_RANK:
      return { ...state, rankList: action.data}
    default:
      return state
  }
}