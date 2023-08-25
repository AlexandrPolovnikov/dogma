import { FC } from 'react';
import Profile from './pages/Profile';
import News from './pages/News';
import Photos from './pages/Photos';
import Login from './pages/Login';

export interface rout {
    path: string;
    Component: FC;
}

const routes: rout[] = [
    { path: '/', Component: Login },
    { path: '/profile', Component: Profile },
    { path: '/photos', Component: Photos },
    { path: '/news', Component: News },
];

export default routes;
