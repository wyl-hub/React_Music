import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAudioDom, setVoice, setPlayListMask } from './store/actions'
import { playMusic, pauseMusic, changeMusic } from './hooks/common';
import { Slider } from 'antd'
import dayjs from 'dayjs'
import Currentlist from './pages/CurrentList/CurrentList'
import styles from './audio.module.less'

const Audio = () => {
    const audioRef = useRef()
    // 将audioDom 存入redux 在其他组件可以操作
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAudioDom(audioRef))
    }, [dispatch, audioRef])

    // 获取播放状态 播放列表 当前播放歌曲 音量调节面板 播放列表操作面板 当前歌词
    const { isPlay, playList, currentSong, voiceFlag, playListMask, currentLyc } = useSelector(state => ({
        isPlay: state.audio.isPlay,
        playList: state.audio.playList,
        currentSong: state.audio.currentSong,
        voiceFlag: state.audio.voiceFlag,
        playListMask: state.audio.playListMask,
        currentLyc: state.audio.currentLyc
    }))

    // 获取当前播放时间 slider上面显示的时间
    const [currentTime, setTime] = useState(0)
    const [temTime, setTemTime] = useState(false)
    const getCurrentTime = (e) => {
        setTime(e.target.currentTime * 1000)
    }
    // console.log('播放列表', playList)
    // console.log('当前播放音乐', currentSong)
    const duration = (currentSong.dt && dayjs(currentSong.dt).format('mm:ss')) || '00:00'

    // 改变silder
    const sliderChange = useCallback(e => {
        setTemTime(e)
    }, [])
    // 取消拖动（音乐跳到当前时刻进行播放）
    const sliderLeave = useCallback(e => {
        audioRef.current.currentTime = e / 1000
        setTime(e)
        setTemTime(false)
    }, [])

    // 歌曲进度条展示进度（在拖动滑块时展示拖动的时间但是歌曲本身没有变化）
    let showTime = currentTime
    if (temTime !== false) showTime = temTime


    // 打开关闭音乐面板
    const openVoice = () => {
        dispatch(setVoice(!voiceFlag))
    }
    // 改变音量
    const [volume, setVolume] = useState(0)
    useEffect(() => {
        setVolume(audioRef.current ? audioRef.current.volume * 100 : 0)
    }, [audioRef])
    const changeVoice = (e) => {
        // 如果组件展示音量直接同步于dom 有卡顿
        setVolume(e)
        audioRef.current.volume = e / 100
    }

    // 播放按钮事件
    const playBtn = playMusic(dispatch, audioRef, currentSong)
    // 暂停按钮事件
    const pauseBtn = pauseMusic(dispatch, audioRef, currentSong)

    // 上一首 下一首
    const lastMusic = useCallback(changeMusic(dispatch, audioRef, playList, currentSong, 'last'), [dispatch, audioRef, playList, currentSong])
    const nextMusic = useCallback(changeMusic(dispatch, audioRef, playList, currentSong, 'next'), [dispatch, audioRef, playList, currentSong])

    // console.log(currentLyc)
    return (
        <div className={styles.audioContainer}>
            <div className={styles.audioMain}>
                {/* 上一首 下一首 播放 */}
                <div className={styles.playOpt}>
                    <div onClick={lastMusic} className={`${styles.playIcon} ${styles.prev}`}></div>
                    {
                        isPlay ?
                            <div onClick={pauseBtn} className={`${styles.playIcon} ${styles.pause}`}></div>
                            :
                            <div onClick={playBtn} className={`${styles.playIcon} ${styles.play}`}></div>
                    }
                    <div onClick={nextMusic} className={`${styles.playIcon} ${styles.next}`}></div>
                </div>
                {/* 音乐信息 */}
                <div className={styles.musicInfo}>
                    {/* 音乐图片 */}
                    <div className={styles.musicImg}>
                        <img src={currentSong.al && currentSong.al.picUrl + '?param=34y34'} />
                    </div>
                    {/* 音乐时长 基本信息 */}
                    <div className={styles.musicContent}>
                        <div className={styles.author}>
                            <span className={styles.songName}>{currentSong.name}</span>
                            <span className={styles.aName}>{currentSong.ar && currentSong.ar[0].name}</span>
                        </div>
                        {/* 音乐slider */}
                        <div className={styles.sliderContainer}>
                            <Slider
                                value={showTime}
                                min={0}
                                max={currentSong.dt ? currentSong.dt : 0}
                                className={styles.slider}
                                onChange={sliderChange}
                                onAfterChange={sliderLeave}
                                tipFormatter={e => dayjs(showTime).format('mm:ss')}
                            />
                            <div className={styles.musicTime}>
                                <span style={{ color: '#a1a1a1' }}>{dayjs(currentTime).format('mm:ss')}</span>
                                <span style={{ color: '#797979' }}>/{duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 声音 列表 */}
                <div className={styles.musicOpt}>
                    <div onClick={openVoice} className={styles.voice}>
                        {
                            voiceFlag &&
                            <div onClick={e => e.stopPropagation()} className={styles.voiceContainer}>
                                <Slider value={volume} onChange={changeVoice} vertical />
                            </div>
                        }
                    </div>
                    <div onClick={() => dispatch(setPlayListMask(!playListMask))} className={styles.list}></div>
                </div>
            </div>
            {/* lock */}
            <div className={styles.lock}>
                <div className={styles.lockIcon}></div>
            </div>
            {/* 播放列表 */}
            {
                playListMask && <Currentlist
                    isPlay={isPlay}
                    audioRef={audioRef}
                    playList={playList}
                    currentSong={currentSong}
                    currentLyc={currentLyc}
                />
            }
            {/* 隐藏的audio */}
            <audio ref={audioRef} onTimeUpdate={getCurrentTime} />
        </div>
    );
}

export default memo(Audio);
