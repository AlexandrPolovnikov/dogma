import { FC } from 'react';
import Profile from './pages/Profile';
import News from './pages/News';
import Photos from './pages/Photos';

export interface rout {
    path: string;
    Component: FC;
}

const routes: rout[] = [
    { path: '/', Component: Profile },
    { path: '/photos', Component: Photos },
    { path: '/news', Component: News },
];

export default routes;
