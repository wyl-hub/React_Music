import { combineReducers } from "redux";

import recommend from '../pages/FindMusic/pages/Recommend/store'
import player from "../pages/FindMusic/pages/Player/store";
import audio from '../components/Audio/store'
import playerlist from '../pages/FindMusic/pages/PlayList/store'


const reducer = combineReducers({
  recommend,
  player,
  audio,
  playerlist
})

export default reducer