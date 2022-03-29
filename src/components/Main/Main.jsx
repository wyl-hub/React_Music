import React from 'react';
import { renderRoutes } from 'react-router-config'
import routes from '../../router/index'
import { useDispatch } from 'react-redux'
import { setPlayListMask, setVoice } from '@/components/Audio/store/actions'
import Header from '../app-header/index'
import Footer from '../app-footer/index'
import Audio from '../Audio/Audio'
import styles from './main.module.less'

const Main = () => {
    const dispatch = useDispatch()
    const closeAll = () => {
        dispatch(setPlayListMask(false))
        dispatch(setVoice(false))
    }
    return (
        <div className='MusicContainer'>
            <div onClick={closeAll}>
                <Header />
                {renderRoutes(routes)}
            </div>
            <Footer />
            <Audio />
            {/* <div className={styles.mask}>
                <Spin className={styles.loading} size='large' tip="Loading" />
            </div> */}
        </div>
    );
}

export default Main;
