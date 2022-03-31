import * as actionTypes from './constans'

const initState = {
  currentInfo: {}
}

export default function(state = initState, action) {
  switch(action.type) {
    case actionTypes.GET_SONGLIST_BYPAGE:
      return { ...state, currentInfo: action.data }
    default:
      return state
  }
}