import React, { memo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './index.module.less'

export default memo(function Header() {
    // 获取当前路由  动态展示底部红色小箭头
    const { pathname } = useLocation()
    return (
        <div className={styles.hederContainer}>
            <NavLink to="/" className={styles.logo}>

            </NavLink>
            <NavLink className={styles.navLink} to="/findmusic">
                <span>发现音乐</span>
                {
                    pathname.split('/')[1] === 'findmusic' && <div className={styles.arrow}></div>
                }
            </NavLink>
            <NavLink className={styles.navLink} to="/mymusic">
                <span>我的音乐</span>
                {
                    pathname.split('/')[1] === 'mymusic' && <div className={styles.arrow}></div>
                }
            </NavLink>
            <NavLink className={styles.navLink} to="/attention">
                <span>关注</span>
                {
                    pathname.split('/')[1] === 'attention' && <div className={styles.arrow}></div>
                }
            </NavLink>
        </div>
    )
})