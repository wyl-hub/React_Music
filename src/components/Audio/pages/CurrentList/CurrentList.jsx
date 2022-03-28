import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import dayjs from 'dayjs'
import { Carousel } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { playNewMusic, removeMusic } from '../../hooks/common'
import styles from './currentList.module.less'


const Currentlist = (props) => {
    const { playList, currentSong, audioRef, currentLyc, isPlay } = props
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    // console.log(playList)
    // console.log(currentSong)

    // 鼠标指向某首歌
    const [curInd, setCurInd] = useState(false)
    const moveIn = useCallback((index) => {
        setCurInd(index)
    }, [])

    const moveOut = () => {
        setCurInd(false)
    }

    // 前往歌曲详情
    const linkDetail = (e, id) => {
        e.stopPropagation()
        if (location.pathname === '/findmusic/player') {
            history.replace(`/findmusic/player?id=${id}`)
        } else {
            history.push(`/findmusic/player?id=${id}`)
        }
    }

    // 计算歌词滚动
    const [curScroInd, setScroInd] = useState(false)
    const swiperDom = useRef()
    useEffect(() => {
        let timr = null
        if (isPlay) {
            timr = setInterval(() => {
                lycScroll(timr)
            }, 100);
        }
        return () => {
            clearInterval(timr)
        }
    }, [curScroInd, isPlay, currentLyc, swiperDom])

    const lycScroll = (timr) => {
        if (!isPlay) {
            clearInterval(timr)
            return
        }
        const currentTime = audioRef.current.currentTime * 1000
        currentLyc.some((item, index) => {
            if (currentTime < item.time) {
                if (index === 0) {
                    if (curScroInd !== 0) {
                        setScroInd(0)
                        swiperDom.current.goTo(0, false)
                    }
                }
                else {
                    if (curScroInd !== index - 1) {
                        setScroInd(index - 1)
                        swiperDom.current.goTo(index - 1)
                    }
                }
                return true
            } else if (index === currentLyc.length - 1) {
                if (curScroInd !== currentLyc.length - 1) {
                    setScroInd(currentLyc.length - 1)
                    swiperDom.current.goTo(currentLyc.length - 1)
                }
            }
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {/* 左侧播放列表头部 */}
                <div className={styles.leftHeader}>
                    <div>播放列表</div>
                    <div className={styles.cleanBox}>
                        <div className={styles.cleanIcon}></div>
                        <div>清除</div>
                    </div>
                </div>
                {/* 当前播放歌曲名称 关闭该窗口 */}
                <div className={styles.rightHeader}>
                    <div>{currentSong.name}</div>
                    <div className={styles.closeIcon}></div>
                </div>
            </div>
            <div className={styles.content}>
                {/* 背景图 */}
                <div className={styles.mask}></div>
                {/* 歌曲列表 */}
                <div className={styles.songList}>
                    {
                        playList.map((item, index) => (
                            <div
                                onMouseEnter={() => moveIn(index)}
                                onMouseLeave={moveOut}
                                onClick={playNewMusic(dispatch, audioRef, item)}
                                key={item.id}
                                className={styles.songItem}
                            >
                                <div className={styles.itemLeft}>
                                    <div className={styles.itemIcon}></div>
                                    <div className={styles.songName}>{item.name}</div>
                                </div>
                                <div className={styles.itemRight}>
                                    {
                                        curInd === index &&
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                return removeMusic(dispatch, playList, item)
                                            }}
                                            className={styles.remove}
                                        ></div>
                                    }
                                    <div className={styles.singerName}>{item.ar[0].name}</div>
                                    <div>{dayjs(item.dt).format('mm:ss')}</div>
                                    <div onClick={(e) => linkDetail(e, item.id)} className={styles.linkIcon}></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* 歌词 */}
                <div className={styles.lycContainer}>
                    <Carousel
                        ref={swiperDom}
                        className={styles.lycSwiper}
                        dotPosition={'left'}
                        dots={false}
                        autoplay={false}
                    >
                        {
                            currentLyc.map((item, index) => (
                                <div key={item.time} className={styles.swiperItem}>
                                    <span style={{ color: curScroInd === index && 'red' }}>{item.content}</span>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default memo(Currentlist);
