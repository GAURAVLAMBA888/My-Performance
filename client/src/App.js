import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Index from "./pages/Index/Index";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import ScoreCard from "./pages/ScoreCard/ScoreCard";
import Settings from './pages/Settings/Settings';
import { AuthContext } from './context/Context';

function App() {
    const {user} = useContext(AuthContext);
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Index />} />
                <Route exact path='/home' element={user ? <Home /> : <Index />} />
                <Route exact path='/home/scorecard/:subid' element={user ? <ScoreCard /> : <Index />} />
                <Route exact path='/login' element={user ? <Home /> : <LogIn />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/home/settings' element={user ? <Settings /> : <Index />} />
            </Routes>
        </Router>
    );
}

export default App;
