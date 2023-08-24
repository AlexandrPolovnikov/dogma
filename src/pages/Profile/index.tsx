import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import User from '../../components/User';
import Button from '../../components/UI/Button';
import { title } from 'process';
import { COLOR_TYPES } from '../../library/constants.enum';
import { YMaps, Map, Panorama } from '@pbe/react-yandex-maps';

const Profile = () => {
    const [users, setUsers] = useState<any>([]);
    const [fetching, setFetching] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (fetching) {
            setIsLoading(true);
            axios
                .get(`https://64149c74e8fe5a3f3a0b7a9d.mockapi.io/users?_limit=12`)
                .then((response) => {
                    setUsers([...users, ...response.data]);
                    setIsLoading(false);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching]);

    console.log(users);
    return (
        <div className="Profile">
            <div className="Profile__header">
                {users
                    .filter((item: { id: number }) => item.id == 66)
                    .map(
                        (user: {
                            id: number;
                            name: string;
                            avatar: string;
                            email: string;
                            photos: any;
                        }) => (
                            <div key={user.id}>
                                {isLoading ? (
                                    <h1>Loading...</h1>
                                ) : (
                                    <div className="Profile__header__user">
                                        <User
                                            className="user"
                                            img={user.avatar}
                                            name={user.name}
                                            id={user.id}
                                        />
                                        <Button
                                            type={COLOR_TYPES.info}
                                            text="Редактировать профиль"
                                        />
                                        <div className="Profile__header__user-img">
                                            <img src={user.photos[0]} alt={user.name} />
                                            <img src={user.photos[1]} alt={user.name} />
                                            <img src={user.photos[2]} alt={user.name} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ),
                    )}
            </div>
            <div className="Profile__footer">
                <div className="Profile__footer__right"></div>
                <div className="Profile__footer__left">
                    {users
                        .filter((item: { id: number }) => item.id < 9)
                        .map(
                            (user: { id: number; name: string; avatar: string; email: string }) => (
                                <div key={user.id}>
                                    {isLoading ? (
                                        <h1>Loading...</h1>
                                    ) : (
                                        <div>
                                            <div className="Profile__header__name">
                                                <User
                                                    className="frends-user"
                                                    img={user.avatar}
                                                    name={user.name}
                                                    id={user.id}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ),
                        )}
                </div>
            </div>
            <div className="Profile__maps">
                <YMaps>
                    <div>
                        <Map
                            defaultState={{ center: [55.75, 37.57], zoom: 8 }}
                            style={{ width: '100%', height: '500px' }}
                        />
                    </div>
                </YMaps>
            </div>
        </div>
    );
};

export default Profile;
