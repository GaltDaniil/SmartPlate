import React from 'react';
import './App.css';
import axios from './axios';
import { useTelegram } from './hooks/useTelegram';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './Pages/Main';
import { Info } from './components/Info';
import { AnaliticsPage } from './components/AnaliticsPage';
import { SupportPage } from './Pages/SupportPage';
import { Loader } from './components/Loader';

import { UserData } from './types';
import { ReferralPage } from './Pages/Referal';
import { BeeChat } from './Pages/BeeChat';
import { ChatLayuot } from './Pages/ChatLayuot';

interface RefInfoResponse {
    referrals: UserData[];
    referralSystem: UserData['referralSystem'];
}

function App(): React.ReactElement<any, any> {
    const [tg] = useTelegram();
    //const user = tg.initDataUnsafe.user;

    //const userId = 299602933;
    const userId = 360641449;
    //const userId = user?.id!;

    const [userInfo, setUserInfo] = React.useState({} as UserData);
    const [refInfo, setRefInfo] = React.useState({} as RefInfoResponse);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fn = async () => {
            const { data } = await axios.get(`/users/${userId}`);
            const response = await axios.get(`/users/referrals/${userId}`);
            setUserInfo((pred) => data as UserData);
            setRefInfo((pred) => response.data as RefInfoResponse);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            setIsLoading(false);
        };
        fn();

        tg.expand();
    }, []);

    return (
        <>
            {!isLoading ? (
                <Router>
                    <Routes>
                        <Route path="/" element={<Main isLoading={isLoading} {...userInfo} />} />
                        <Route path="/info" element={<Info />} />
                        <Route path="/analitics" element={<AnaliticsPage />} />
                        <Route path="/support" element={<SupportPage userId={userId} />} />
                        <Route path="/loading" element={<Loader />} />
                        <Route
                            path="/referral"
                            element={<ReferralPage userId={userId} refInfo={refInfo} />}
                        />
                        <Route path="/beechat" element={<BeeChat />} />
                        <Route path="/admin" element={<ChatLayuot />} />
                    </Routes>
                </Router>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default App;
