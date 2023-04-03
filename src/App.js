import React from 'react';
import './App.css';
import axios from 'axios';
import { useTelegram } from './hooks/useTelegram';

import { NutritionPlanForm } from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { Info } from './components/Info';

function App() {
    const [tg] = useTelegram();

    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
        const fn = async () => {
            const data = await axios.get(
                `http://localhost:8080/api/users/${tg.initDataUnsafe.user.id}`,
            );
            console.log(data);
            setUserInfo((pred) => data);
        };
        fn();
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main tokens={userInfo.tokens} />} />
                    <Route path="/form" element={<NutritionPlanForm />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/pay" element={<Main />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
