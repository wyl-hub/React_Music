import React, { memo } from 'react'
import styles from './index.module.css'

export default memo(function Footer() {
    return (
        <div className={styles.footerContainer}>
            <h2>底部</h2>
            <h2>webpack react hooks antd</h2>
            <p>歌曲列表操作栏 滚动条样式 可能只有webkit内核浏览器生效</p>
        </div>
    )
})