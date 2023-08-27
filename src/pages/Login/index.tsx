import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import { authorizedUserApi, getProfileDataApi } from '../../api/user';
import Button from '../../components/UI/Button';
import { COLOR_TYPES } from '../../library/constants.enum';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Login = ({ setUserData }: any) => {
    const [login, setLogin] = useState('');
    const [testLogin, setTestLogin] = useState('candidate@test.com');
    const [password, setPassword] = useState('');
    const [testPassword, setTestPassword] = useState('Sj3jtod@!3');
    const [signInError, setSignInError] = useState({});
    const navigate = useNavigate();

    const signInSubmit = () => {
        login !== testLogin || password !== testPassword
            ? alert(`Не правильный логин или пароль`)
            : authorizedUserApi(
                  { email: login, password: password, rememberMe: 1 },
                  () =>
                      getProfileDataApi((res: { data: string }) => {
                          setUserData(
                              res.data ?? {
                                  email: 'candidate@test.com',
                                  password: 'Sj3jtod@!3',
                              },
                              navigate('/profile'),
                          );
                      }),
                  (err: { validationErrors: React.SetStateAction<{}>; code: string }) => {
                      if (err?.validationErrors) {
                          setSignInError(err?.validationErrors);
                      } else {
                          console.log(login, testLogin + '' + password, testPassword);
                          alert(`Ошибка Код:${err?.code}`);
                          navigate('/profile');
                      }
                  },
              );

        setSignInError({});
    };

    return (
        <div className="Login">
            <h1>Авторизация</h1>
            <p className="text-muted">Войдите в свой аккаунт</p>
            <Input
                type="text"
                placeholder="Логин"
                autoComplete="username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && password && login) {
                        signInSubmit();
                    }
                }}
            />
            <Input
                type="password"
                placeholder="Пароль"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && password && login) {
                        signInSubmit();
                    }
                }}
            />
            <Button
                onClick={signInSubmit}
                disabled={!password || !login}
                text="Вход"
                type={COLOR_TYPES.info}
            />
        </div>
    );
};

export default Login;
