import actionTypes from './constans'

const initState = {
  banner: []
}

export default function(state = initState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return { ...state, banner: action.data }
    default:
      return state
  }
}