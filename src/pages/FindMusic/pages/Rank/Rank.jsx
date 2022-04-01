import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { getRankDetailAction, cleanCurrentDetail } from './store/actions'
import { playNewMusic } from '@/components/Audio/hooks/common'
import styles from './rank.module.less'
import dayjs from 'dayjs'


const Rank = () => {
  // 获取路由传递过来的参数
  const location = useLocation()
  let id = ''
  if (location.search) {
    id = location.search.split('?')[1].split('=')[1]
  }

  // 获取该排行榜详情
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) dispatch(getRankDetailAction(id))
    else dispatch(getRankDetailAction(3779629))
    return () => {
      // 清空当前 store中数据 避免下次进入该页面展示之前的数据
      dispatch(cleanCurrentDetail())
    }
  }, [dispatch])

  // 获取该榜详情
  const { rankDetail, currentSong, audioRef } = useSelector(state => ({
    rankDetail: state.rank.rankDetail,
    currentSong: state.audio.currentSong,
    audioRef: state.audio.audioRef
  }))
  const { tracks = [] } = rankDetail

  // 播放该歌单
  const playSongList = useCallback(() => {
    playNewMusic(dispatch, audioRef, null, tracks)()
  }, [dispatch, audioRef, tracks])

  // 播放音乐
  const playMusic = useCallback((index) => {
    const item = tracks[index]
    playNewMusic(dispatch, audioRef, item)()
  }, [dispatch, tracks, audioRef])


  // to 音乐详情
  const history = useHistory()
  const toSongDetail = useCallback((id) => {
    history.push(`/findmusic/player?id=${id}`)
  }, [useHistory])

  return (
    <div className={styles.container}>
      {/* 歌单详情 */}
      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <img src={rankDetail.coverImgUrl + '?param=200y200'} />
        </div>
        <div className={styles.infoRight}>
          {/* 歌单名称 */}
          <h2>{rankDetail.name}</h2>
          <button onClick={playSongList} className={styles.playBtn}>播放</button>
          <div className={styles.description}>
            <p>介绍：</p>
            <div>{rankDetail.description}</div>
          </div>
        </div>
      </div>
      {/* 歌曲列表 */}
      <div className={styles.songList}>
        <div className={styles.title}>歌曲列表</div>
        <div className={styles.tableBox}>
          {/* 表头 */}
          <div className={styles.th}>
            <div className={styles.tIcon}>排名</div>
            <div className={styles.songName}>歌曲名称</div>
            <div className={styles.songTime}>歌曲时长</div>
            <div className={styles.author}>歌手</div>
            <div className={styles.album}>专辑</div>
          </div>
          {/* 表体 */}
          {
            tracks.map((item, index) => (
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
    </div>
  );
}

export default memo(Rank);
