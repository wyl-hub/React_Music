import React, { memo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getSongDetail } from './store/actions'
import { changePlayStatus, setCurrentSong, addPlayList } from '../../components/Audio/store/actions'
import styles from './player.module.less'
const Player = () => {
    // 获取路由传递过来的参数
    const location = useLocation()
    // const { id } = location.state || {}
    const id = '1463165983'
    // 从store 中获取歌曲详情
    const { songDetail } = useSelector(state => ({
        songDetail: state.player.songDetail
    }))
    console.log('songDetail', songDetail)
    
    // 请求歌曲详情
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSongDetail(id))
    }, [dispatch])
    
    

    // 获取audio dom 
    const { audioRef } = useSelector(state => ({
        audioRef: state.audio.audioRef
    }))

    const playMusic = useCallback(() => {
        if (JSON.stringify(songDetail) === '{}') return
        // 获取音频资源 播放音乐  且改变audio播放状态
        const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        audioRef.current.src = url
        audioRef.current.load()
        audioRef.current.play()
        // 改变播放状态
        dispatch(changePlayStatus(true))
        // 设置当前播放歌曲
        dispatch(setCurrentSong(songDetail))
        // 加入播放队列
        dispatch(addPlayList([songDetail]))
    })

    return (
        <div className={styles.container}>
            <div className={styles.musicImg}>
                <img src={songDetail.al && songDetail.al.picUrl} />
                <div className={styles.musicBorder}></div>
            </div>
            <div className={styles.musicInfo}>
                <h2>{songDetail.name}</h2>
                <div>歌手：{songDetail.ar && songDetail.ar[0].name}</div>
                <button onClick={playMusic} className={styles.playBtn}>播放</button>
            </div>
        </div>
    );
}

export default memo(Player);
