import React from 'react';
import './App.css';
import { NutritionPlanForm } from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { Info } from './components/Info';

function App() {
    return (
        <>
            <Router>
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
