import React from 'react'
import { Redirect } from 'react-router-dom'
import FindMusic from '../pages/FindMusic/FindMusic'
import MyMusic from '../pages/Mymusic/Mymusic'
import Attention from "@/pages/Attention/Attention"
import Recommend from '../pages/FindMusic/pages/Recommend/Recommend'
import AlbumList from '../pages/FindMusic/pages/AlbumList/AlbumList'
import Rank from '../pages/FindMusic/pages/Rank/Rank'
import SongList from '../pages/FindMusic/pages/SongList/SongList'
import Station from '../pages/FindMusic/pages/Station/Station'
import Singer from '../pages/FindMusic/pages/Singer/Singer'
import SingerList from '../pages/FindMusic/pages/SingerList/SingerList'
import Player from '../pages/FindMusic/pages/Player/Player'
import PlayList from '../pages/FindMusic/pages/PlayList/PlayList'
import Album from '../pages/FindMusic/pages/Album/Album'
import Playmv from '../pages/FindMusic/pages/PlayMv/PlayMv'

const routes = [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to="/findmusic" />
    },
    {
        path: '/findmusic',
        component: FindMusic,
        routes: [
            {
                path: '/findmusic',
                exact: true,
                render: () => <Redirect to="/findmusic/Recommend" />
            },
            {
                path: '/findmusic/Recommend',
                exact: true,
                component: Recommend
            },
            {
                path: '/findmusic/Rank',
                exact: true,
                component: Rank
            },
            {
                path: '/findmusic/AlbumList',
                exact: true,
                component: AlbumList
            },
            {
                path: '/findmusic/SongList',
                exact: true,
                component: SongList
            },
            {
                path: '/findmusic/Station',
                exact: true,
                component: Station
            },
            {
                path: '/findmusic/Singer',
                component: Singer
            },
            {
                path: '/findmusic/SingerList',
                component: SingerList
            },

            {
                path: '/findmusic/player',
                component: Player
            },
            {
                path: '/findmusic/playlist',
                component: PlayList
            },
            {
                path: '/findmusic/album',
                component: Album
            },
            {
                path: '/findmusic/Playmv',
                component: Playmv
            }
            
        ]
    },
    {
        path: '/mymusic',
        exact: true,
        component: MyMusic
    },
    {
        path: '/attention',
        exact: true,
        component: Attention
    },

]


export default routes