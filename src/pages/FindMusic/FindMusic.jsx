import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import styles from './findMusic.module.less'

const Findmusic = (props) => {
    const routes = props.route.routes
    const { pathname } = useLocation()
    return (
        <div>
            <div className={styles.headerNav}>
                <NavLink className={styles.navLink} to="/findmusic/Recommend">
                    <span className={`${styles.navText} ${pathname.split('/')[2] === 'Recommend' ? styles.active : ''}`}>推荐</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/Rank">
                    <span className={`${styles.navText} ${pathname.split('/')[2] === 'Rank' ? styles.active : ''}`}>排行榜</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/SongList">
                    <span className={`${styles.navText} ${pathname.split('/')[2] === 'SongList' ? styles.active : ''}`}>歌单</span>
                </NavLink>
                {/* <NavLink className={styles.navLink} to="/findmusic/Station">
                    <span className={`${styles.navText} ${pathname.split('/')[2] === 'Station' ? styles.active : ''}`}>主播电台</span>
                </NavLink> */}
                <NavLink className={styles.navLink} to="/findmusic/SingerList">
                    <span className={`${styles.navText} ${pathname.split('/')[2] === 'SingerList' ? styles.active : ''}`}>歌手</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/AlbumList">
                    <span className={`${styles.navText} ${pathname.split('/')[2] === 'AlbumList' ? styles.active : ''}`}>新碟上架</span>
                </NavLink>
            </div>
            <div>
                {renderRoutes(routes)}
            </div>
        </div>
    );
}

export default memo(Findmusic);
