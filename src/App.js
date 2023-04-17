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

function App() {
    const [tg] = useTelegram();
    const user = tg.initDataUnsafe.user;
    const userId = '299602933';
    //const userId = user.id;

    const [userInfo, setUserInfo] = React.useState({});
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        setIsLoaded(false);
        const fn = async () => {
            const { data } = await axios.get(`/users/${userId}`);
            setUserInfo((pred) => data);
        };
        fn();

        tg.expand();
        setIsLoaded(true);
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    {isLoaded ? (
                        <Route
                            path="/"
                            element={
                                <Main
                                    userId={userId}
                                    tokens={userInfo.tokens}
                                    diets={userInfo.diets}
                                />
                            }
                        />
                    ) : null}
                    <Route
                        path="/form"
                        element={<Form tokens={userInfo.tokens} diets={userInfo.diets} />}
                    />
                    <Route path="/info" element={<Info />} />
                    <Route path="/recipt" element={<Recipt />} />
                    <Route path="/analitics" element={<AnaliticsPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
