import React, { Fragment, memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Theamheader from '@/components/TheamHeader/TheamHeader'
import Cover from '@/components/Cover/Cover'
import { getHotList } from '../../store/actions'
import styles from './hotRecommend.module.less'

const Hotrecommend = () => {
    // 获取数据
    const { hotList } = useSelector(state => ({
        hotList: state.recommend.hotList
    }))
    
    // 请求热门数据
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHotList())
    }, [dispatch])

    

    return (
        <div className={styles.container}>
            <Theamheader
                title={'热门推荐'}
                titlePath={'/findmusic/SongList'}
                // keywordList={['华语', '流行', '摇滚', '民谣', '电子']}
            />
            <div className={styles.coverBox}>
                {
                    hotList.map(item => (
                        <div key={item.id} >
                            <Cover item={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default memo(Hotrecommend);
