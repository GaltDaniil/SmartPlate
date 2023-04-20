import React from 'react';
import './App.css';
import axios from './axios';
import { useTelegram } from './hooks/useTelegram';

import { Form } from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { Info } from './components/Info';
import { Recipt } from './components/Recipt';
import { AnaliticsPage } from './components/AnaliticsPage';
import { SupportPage } from './components/SupportPage';

function App() {
    const [tg] = useTelegram();
    const user = tg.initDataUnsafe.user;
    //const userId = '299602933';
    const userId = user.id;

    const [userInfo, setUserInfo] = React.useState({});
    const [isLoading, setIsloading] = React.useState(false);

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get(`/users/${userId}`);
            setUserInfo((pred) => data);
            setIsloading(true);
        };
        fn();

        tg.expand();
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main
                                isLoading={isLoading}
                                userId={userId}
                                tokens={userInfo.tokens}
                                diets={userInfo.diets}
                            />
                        }
                    />
                    <Route
                        path="/form"
                        element={<Form tokens={userInfo.tokens} diets={userInfo.diets} />}
                    />
                    <Route path="/info" element={<Info />} />
                    <Route path="/recipt" element={<Recipt />} />
                    <Route path="/analitics" element={<AnaliticsPage />} />
                    <Route path="/support" element={<SupportPage userId={userId} />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
