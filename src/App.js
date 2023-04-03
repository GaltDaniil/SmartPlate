import React from 'react';
import './App.css';
import axios from 'axios';
import { useTelegram } from './hooks/useTelegram';

import { NutritionPlanForm } from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { Info } from './components/Info';

function App() {
    const tg = useTelegram();
    console.log(tg.initDataUnsafe);
    //const user = tg.initDataUnsafe.user;

    const [userInfo, setUserInfo] = React.useState([]);

    React.useEffect(() => {
        //axios.get(`http://localhost:8080/api/users/${}`);
    }, []);

    return (
        <>
            <Router>
                <p>{JSON.stringify(tg.initDataUnsafe.user)}</p>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/form" element={<NutritionPlanForm />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/pay" element={<Main />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
