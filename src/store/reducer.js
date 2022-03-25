import { combineReducers } from "redux";

import recommend from '../pages/FindMusic/pages/Recommend/store'
import player from "../pages/Player/store";


const reducer = combineReducers({
  recommend,
  player
})

export default reducer