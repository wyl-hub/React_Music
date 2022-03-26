import React, { memo } from 'react'
import styles from './index.module.css'

export default memo(function Footer() {
    return (
        <div className={styles.footerContainer}>
            <h2>wyl 练手项目</h2>
            <h2>webpack react hooks</h2>
        </div>
    )
})