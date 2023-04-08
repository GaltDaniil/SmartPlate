import React from 'react';
import './App.css';
import axios from 'axios';
import { useTelegram } from './hooks/useTelegram';

import { Form } from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { Info } from './components/Info';

function App() {
    const [tg] = useTelegram();
    const userId = '299602933';

    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get(`https://smartdietai.ru/api/users/${userId}`);
            setUserInfo((pred) => data);
        };
        fn();
    }, []);
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={<Main tokens={userInfo.tokens} diets={userInfo.diets} />}
                    />
                    <Route
                        path="/form"
                        element={<Form tokens={userInfo.tokens} diets={userInfo.diets} />}
                    />
                    <Route path="/info" element={<Info />} />
                    <Route path="/pay" element={<Main />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
