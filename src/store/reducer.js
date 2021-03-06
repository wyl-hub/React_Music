import { combineReducers } from "redux";

import recommend from '../pages/FindMusic/pages/Recommend/store'
import player from "../pages/FindMusic/pages/Player/store";
import audio from '../components/Audio/store'
import playerlist from '../pages/FindMusic/pages/PlayList/store'
import album from '../pages/FindMusic/pages/Album/store'
import songlist from '../pages/FindMusic/pages/SongList/store'
import albumlist from '../pages/FindMusic/pages/AlbumList/store'
import rank from '../pages/FindMusic/pages/Rank/store'
import singer from '../pages/FindMusic/pages/Singer/store'
import singlist from '../pages/FindMusic/pages/SingerList/store'

const reducer = combineReducers({
  recommend,
  player,
  audio,
  playerlist,
  album,
  songlist,
  albumlist,
  rank,
  singer,
  singlist
})

export default reducer