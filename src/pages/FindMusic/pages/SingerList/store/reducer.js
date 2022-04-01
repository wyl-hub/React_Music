import * as actionTypes from './constans'

const initState = {
    songstress: [],
    maleSinger: []
}
export default function (state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_CHINESESINGER_1:
            return { ...state, maleSinger: action.data }
        case actionTypes.GET_CHINESESINGER_2:
            return { ...state, songstress: action.data }
        default:
            return state
    }
}