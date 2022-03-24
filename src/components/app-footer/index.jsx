import React, { memo } from 'react'
import styles from './index.module.css'

export default memo(function Footer() {
    return (
        <div className={styles.footerContainer}>
            <h2>我是底部</h2>
        </div>
    )
})