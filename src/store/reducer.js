import { combineReducers } from "redux";

import recommend from '../pages/FindMusic/pages/Recommend/store'
import player from "../pages/Player/store";
import audio from '../components/Audio/store'


const reducer = combineReducers({
  recommend,
  player,
  audio
})

export default reducer