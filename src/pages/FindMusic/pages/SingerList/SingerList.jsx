import React, { memo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { getSingerlist } from './store/actions'
import styles from './singlist.module.less'

const Singerlist = () => {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingerlist())
    }, [dispatch])

    const { songstress, maleSinger } = useSelector(state => ({
        songstress: state.singlist.songstress,
        maleSinger: state.singlist.maleSinger
    }))

    const toSingerDetail = item => {
        if (location.pathname === '/findmusic/Singer') {
            history.replace(`/findmusic/Singer?id=${item.id}`)
        } else {
            history.push(`/findmusic/Singer?id=${item.id}`)
        }
    }

    return (
        <div className={styles.container}>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="华语男歌手" key="1" >
                    <div className={styles.listBox}>
                        {
                            maleSinger.map(item => (
                                <div onClick={() => toSingerDetail(item)} key={item.id} className={styles.item}>
                                    <img src={item.picUrl + '?param=130y130'} />
                                    <div className={styles.name}>{item.name}</div>
                                </div>
                            ))
                        }
                    </div>
                </TabPane>
                <TabPane tab="华语女歌手" key="2" >
                    <div className={styles.listBox}>
                        {
                            songstress.map(item => (
                                <div onClick={() => toSingerDetail(item)} key={item.id} className={styles.item}>
                                    <img src={item.picUrl + '?param=130y130'} />
                                    <div className={styles.name}>{item.name}</div>
                                </div>
                            ))
                        }
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default memo(Singerlist);
