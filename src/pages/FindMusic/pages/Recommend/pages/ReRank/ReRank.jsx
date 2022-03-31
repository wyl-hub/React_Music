import React, { memo, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'
import Theamheader from '@/components/TheamHeader/TheamHeader'
import { getRank } from '../../store/actions'
import styles from './reRank.module.less'

const Rerank = () => {
    // 获取路由对象
    const history = useHistory()
    // 获取数据
    const { rankList } = useSelector(state => ({
        rankList: state.recommend.rankList
    }))
    // 请求数据
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRank())
    }, [dispatch])

    // 指上对应的歌曲时展示后面的操作icon
    const [pointerArr, setPoint] = useState(['', ''])

    // hover某一歌曲
    const hoverLi = useCallback((index, ind) => {
        const arr = [index, ind]
        setPoint(arr)
    })

    // 鼠标离开
    const leaveLi = useCallback(() => {
        const arr = ['', '']
        setPoint(arr)
    })

    // 进入歌曲详情
    const enterDetail = useCallback((index, ind) => {
        const aim = rankList[index].playlist.tracks[ind]
        history.push(`/findmusic/player?id=${aim.id}`)
    }, [rankList])

    // 进入排行详情
    const toRankDetail = item => {
        history.push(`/findmusic/Rank?id=${item.playlist.id}`)
    }
    return (
        <div>
            <Theamheader title={'榜单'} />
            {/* 排行榜 */}
            <div className={styles.main}>
                {/* 排行榜头部信息 */}
                {
                    rankList.map((item, index) => (
                        <div key={item.playlist.createTime} className={styles.rankItem}>
                            <div className={styles.itemTop}>
                                <div>
                                    <img onClick={() => toRankDetail(item)} src={item.playlist.coverImgUrl} />
                                </div>
                                <div className={styles.tioRight}>
                                    <div onClick={() => toRankDetail(item)} className={styles.rankTitle}>{item.playlist.name}</div>
                                    <div className={styles.rightIcon}>
                                        {/* <div className={styles.play}></div>
                                        <div className={styles.add}></div> */}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.itemContent}>
                                {/* 歌曲列表 */}
                                {
                                    item.playlist.tracks.slice(0, 10).map((son, ind) => (
                                        <div
                                            key={son.id}
                                            onMouseEnter={() => hoverLi(index, ind)}
                                            onMouseLeave={leaveLi}
                                            onClick={() => enterDetail(index, ind)}
                                            className={styles.contentItem}
                                        >
                                            <div className={styles.itemLeft}>
                                                <span className={styles.num}>{ind + 1}</span>
                                                <span className={styles.song}>{son.name}</span>
                                            </div>
                                            {/* 歌曲操作icon */}
                                            {
                                                pointerArr[0] === index && pointerArr[1] === ind && (
                                                    <div className={styles.itemRight}>
                                                        {/* <div className={`${styles.itemIcon} ${styles.itemPlay}`}></div>
                                                        <div className={`${styles.itemIcon} ${styles.itemAdd}`}></div>
                                                        <div className={`${styles.itemIcon} ${styles.itemFloder}`}></div> */}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                                <div onClick={() => toRankDetail(item)} className={styles.contentFooter}>
                                    查看全部→
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default memo(Rerank);
