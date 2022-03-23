import FindMusic from '../pages/FindMusic/FindMusic'
import MyMusic from '../pages/Mymusic/Mymusic'
import Attention from "@/pages/Attention/Attention"

const routes = [
    {
        path: '/',
        exact: true,
        component: FindMusic
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
    }
]


export default routes