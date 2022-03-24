import React from 'react';
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import styles from './findMusic.module.less'

const Findmusic = (props) => {
    const routes = props.route.routes
    return (
        <div>
            <div className={styles.headerNav}>
                <NavLink className={styles.navLink} to="/findmusic/Recommend">
                    <span className={styles.navText}>推荐</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/Rank">
                    <span className={styles.navText}>排行榜</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/SongList">
                    <span className={styles.navText}>歌单</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/Station">
                    <span className={styles.navText}>主播电台</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/Singer">
                    <span className={styles.navText}>歌手</span>
                </NavLink>
                <NavLink className={styles.navLink} to="/findmusic/NewBorn">
                    <span className={styles.navText}>新碟上架</span>
                </NavLink>
            </div>
            <div className={styles.mainContent}>
                {renderRoutes(routes)}
            </div>
        </div>
    );
}

export default Findmusic;
