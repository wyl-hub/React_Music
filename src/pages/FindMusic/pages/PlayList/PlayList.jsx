import React, { memo, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getListDetail } from './store/actions'
import { changePlayStatus, setCurrentSong, addPlayList } from '@/components/Audio/store/actions'
import { playNewMusic } from '@/components/Audio/hooks/common'
import dayjs from 'dayjs'
import styles from './playList.module.less'

const Playlist = () => {
    // 获取路由传递过来的参数
    const location = useLocation()
    let id = ''
    if (location.search) {
        id = location.search.split('?')[1].split('=')[1]
    }

    // 获取歌单详情 播放组件 当前播放歌曲
    const { playlist, songList, audioRef, currentSong } = useSelector(state => ({
        playlist: state.playerlist.playlist,
        songList: state.playerlist.songList,
        audioRef: state.audio.audioRef,
        currentSong: state.audio.currentSong
    }))

    // 请求歌单详情
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) dispatch(getListDetail(id))
    }, [dispatch])


    // 播放音乐
    const playMusic = useCallback((index) => {
        const item = songList[index]
        playNewMusic(dispatch, audioRef, item)()
    }, [songList])


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
                    <img src={playlist.coverImgUrl} />
                </div>
                <div className={styles.infoRight}>
                    {/* 歌单名称 */}
                    <h2>{playlist.name}</h2>
                    <button className={styles.playBtn}>播放</button>
                    <div className={styles.description}>
                        <p>介绍：</p>
                        <div>{playlist.description}</div>
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
                        songList.map((item, index) => (
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

export default memo(Playlist);
