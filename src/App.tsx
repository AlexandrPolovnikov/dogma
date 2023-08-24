import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from './routes';
import { useState } from 'react';
import Button from './components/UI/Button';
import { COLOR_TYPES } from './library/constants.enum';
import Sun from './components/UI/Button/icons/Sun';

function App() {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const clickActive = (value: string) => {
        if (active) {
            setActive(false);
        } else {
            setActive(true);
        }
        navigate(`/${value}`);
    };

    return (
        <div className="Main-Page">
            <div className={active ? 'Menu active' : 'Menu'} onClick={(e) => e.stopPropagation()}>
                <Sun />
                <Button
                    className="button home-icon"
                    text="Profile"
                    type={COLOR_TYPES.info}
                    onClick={() => clickActive('')}
                />
                <Button
                    className="item__button home-icon"
                    text="News"
                    type={COLOR_TYPES.info}
                    onClick={() => clickActive('news')}
                />
                <Button
                    className="item__button home-icon"
                    text="Photos"
                    type={COLOR_TYPES.info}
                    onClick={() => clickActive('photos')}
                />
                <></>
            </div>
            <div className="Content">
                <div>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.Component />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
