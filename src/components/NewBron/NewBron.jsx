import React, { memo } from 'react';
import { useHistory } from 'react-router-dom'
import styles from './newBron.module.less'

const NewBron = (props) => {
    const history = useHistory()
    const { son } = props
    const toDetail = () => {
        history.push(`/findmusic/album?id=${son.id}`)
    }
    return (
        <div onClick={toDetail} className={styles.box}>
            <img src={son.blurPicUrl + '?param=100y100'} />
            <div className={styles.bgImg}></div>
            <div className={styles.text}>{son.name}</div>
            <div className={styles.text}>{son.artists[0].name}</div>
        </div>
    );
}

export default memo(NewBron);
