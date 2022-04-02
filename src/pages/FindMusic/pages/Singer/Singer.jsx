import React, { useEffect, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { playNewMusic } from '@/components/Audio/hooks/common'
import { getSingerDetailAction } from './store/actions'
import styles from './singer.module.less'
import dayjs from 'dayjs'

export default memo(function Singer() {
  // 获取路由传递过来的参数
  const location = useLocation()
  let id = ''
  if (location.search) {
    id = location.search.split('?')[1].split('=')[1]
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) dispatch(getSingerDetailAction(id))
    return () => {
      dispatch(getSingerDetailAction())
    }
  }, [dispatch]);

  // 获取歌手详情以及热门歌曲
  const { artist, hotSong, audioRef, currentSong } = useSelector(state => ({
    artist: state.singer.artist,
    hotSong: state.singer.hotSong,
    audioRef: state.audio.audioRef,
    currentSong: state.audio.currentSong,
  }))

  // 播放音乐
  const playMusic = useCallback((index) => {
    const item = hotSong[index]
    playNewMusic(dispatch, audioRef, item)()
  }, [dispatch, hotSong, audioRef])


  // to 音乐详情
  const history = useHistory()
  const toSongDetail = useCallback((id) => {
    history.push(`/findmusic/player?id=${id}`)
  }, [useHistory])

  return (
    <div className={styles.container}>
      {/* 歌单详情 */}
      <div className={styles.info}>
        <img src={artist.picUrl + '?param=980y400'} />
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="热门作品" key="1">
          {/* 歌曲列表 */}
          <div className={styles.songList}>
            <div className={styles.tableBox}>
              {/* 表头 */}
              <div className={styles.th}>
                <div className={styles.tIcon}></div>
                <div className={styles.songName}>歌曲名称</div>
                <div className={styles.songTime}>歌曲时长</div>
                <div className={styles.author}>歌手</div>
                <div className={styles.album}>专辑</div>
              </div>
              {/* 表体 */}
              {
                hotSong.map((item, index) => (
                  <div key={item.id} className={styles.tb}>
                    <div className={styles.tIcon}>
                      <div className={styles.index}>{index + 1}</div>
                      {
                        currentSong.id === item.id ?
                          <div onClick={() => playMusic(index)} className={`${styles.icon} ${styles.activeIcon}`}></div>
                          :
                          <div onClick={() => playMusic(index)} className={styles.icon}></div>
                      }
                    </div>
                    <div onClick={() => toSongDetail(item.id)} className={styles.songName}>{item.name}</div>
                    <div className={styles.songTime}>{dayjs(item.dt).format('mm:ss')}</div>
                    <div className={styles.author}>{item.ar[0].name}</div>
                    <div className={styles.album}>{item.al.name}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </TabPane>
        <TabPane tab="艺人介绍" key="2">
          <p>
            {artist.briefDesc}
          </p>
        </TabPane>
      </Tabs>

    </div>
  )
})
