
import { get } from './request'

export const getSongDetail = async (ids) => {
  return get('/song/detail', { ids })
}

// 歌词数据
// /lyric?id