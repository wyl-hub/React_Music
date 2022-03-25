import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getSongDetail } from './store/actions'
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
    
    // 获取播放器dom
    const playerDom = useRef()

    const playMusic = () => {
        const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        playerDom.current.src = url
        playerDom.current.play()
    }
    return (
        <div className={styles.container}>
            播放音乐
            <button onClick={playMusic}>播放</button>
            <audio ref={playerDom}  />
        </div>
    );
}

export default memo(Player);
