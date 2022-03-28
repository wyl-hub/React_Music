import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'antd';
import { useLocation } from 'react-router-dom';
import { getSongDetail } from './store/actions'
import { playNewMusic } from '@/components/Audio/hooks/common'
import { changePlayStatus, setCurrentSong, addPlayList } from '@/components/Audio/store/actions'
import styles from './player.module.less'


const Player = () => {

    // 从store 中获取歌曲详情
    const { songDetail, lrc } = useSelector(state => ({
        songDetail: state.player.songDetail,
        lrc: state.player.lrc
    }))

    // 获取路由传递过来的参数
    const location = useLocation()
    // 请求歌曲详情
    const dispatch = useDispatch()
    useEffect(() => {
        let id = ''
        if (location.search) {
            id = location.search.split('?')[1].split('=')[1]
        }
        if (id) dispatch(getSongDetail(id))
    }, [dispatch, location])

    // 获取audio dom 
    const { audioRef } = useSelector(state => ({
        audioRef: state.audio.audioRef
    }))

    return (
        <div className={styles.container}>
            <div className={styles.musicImg}>
                <img src={songDetail.al && songDetail.al.picUrl + '?param=130y130'} />
                <div className={styles.musicBorder}></div>
            </div>
            <div className={styles.musicInfo}>
                <h2>{songDetail.name}</h2>
                <div>歌手：{songDetail.ar && songDetail.ar[0].name}</div>
                <button onClick={playNewMusic(dispatch, audioRef, songDetail)} className={styles.playBtn}>播放</button>
                {/* 歌词 */}
                <div className={styles.lyricBox}>
                    {/* {
                        lrc.map(item => <div>{item.content} </div>)
                    } */}
                </div>
            </div>
        </div>
    );
}

export default memo(Player);
