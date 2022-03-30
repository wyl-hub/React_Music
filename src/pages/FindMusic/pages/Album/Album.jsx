import React, { memo, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumDetailAction } from './store/actions'
import { playNewMusic } from '@/components/Audio/hooks/common'
import dayjs from 'dayjs'
import styles from './album.module.less'

const Album = () => {
    // 获取路由传递过来的参数
    const location = useLocation()
    let id = ''
    if (location.search) {
        id = location.search.split('?')[1].split('=')[1]
    }

    const dispatch = useDispatch()
    useEffect(() => {
        if (id) dispatch(getAlbumDetailAction(id))
    }, [dispatch, id])

    // 获取专辑详情以及歌单 当前播放歌曲
    const { albumInfo, songs, audioRef, currentSong } = useSelector(state => ({
        albumInfo: state.album.albumInfo,
        songs: state.album.songs,
        audioRef: state.audio.audioRef,
        currentSong: state.audio.currentSong
    }))
  
    // 播放该歌单
    const playSongList = useCallback(() => {
        playNewMusic(dispatch, audioRef, null, songs)()
    }, [dispatch, audioRef, songs])

    // 播放音乐
    const playMusic = useCallback((index) => {
        const item = songs[index]
        playNewMusic(dispatch, audioRef, item)()
    }, [dispatch, songs, audioRef])


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
                    <img src={albumInfo.picUrl + '?param=200y200'} />
                </div>
                <div className={styles.infoRight}>
                    {/* 歌单名称 */}
                    <h2>{albumInfo.name}</h2>
                    <button onClick={playSongList} className={styles.playBtn}>播放</button>
                    <div className={styles.description}>
                        <p>介绍：</p>
                        <div>{albumInfo.description}</div>
                    </div>
                </div>
            </div>
            {/* 歌曲列表 */}
            <div className={styles.songList}>
                <div className={styles.title}>歌曲列表</div>
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
                        songs.map((item, index) => (
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

export default memo(Album);
